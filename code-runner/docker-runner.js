const { spawn } = require('child_process');

class DockerRunner {
  constructor(options = {}) {
    this.timeout = options.timeout || 2000; // ms
    this.memory = options.memory || '256m';
    this.cpus = options.cpus || '0.5';
    this.image = options.image || 'node:20-alpine';
    this.disableDocker = !!process.env.DISABLE_DOCKER || options.disableDocker || false;
  }

  async run({ language, code, stdin }) {
    // If Docker is disabled (CI or not available), simulate execution
    if (this.disableDocker) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (language !== 'javascript') {
            resolve({ stdout: `Language ${language} is not supported in POC`, exitCode: 124 });
          } else {
            resolve({ stdout: `Simulated (docker disabled) output for language=${language}` , exitCode: 0 });
          }
        }, 150);
      });
    }

    // For POC, we run a container that executes the code using `node -e` for JS only.
    // NOTE: This is a POC: do NOT mount host paths or expose network. Use --rm --network=none.
    // We'll only support 'javascript' in the POC; for other languages, return an informative error.
    if (language !== 'javascript') {
      return { stdout: `Language ${language} is not supported in POC`, exitCode: 124 };
    }

    return new Promise((resolve, reject) => {
      const cmd = 'docker';
      // Build the eval command to run inside the container
      const inner = `node -e "try{console.log((() => { ${code.replace(/"/g, '\\"')} })());}catch(e){console.error(e); process.exit(1);}"`;
      const args = [
        'run', '--rm', '--network', 'none', '--memory', this.memory, '--cpus', this.cpus, this.image,
        'sh', '-c', inner
      ];

      const proc = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'pipe'] });

      let stdout = '';
      let stderr = '';
      let killed = false;

      const t = setTimeout(() => {
        killed = true;
        proc.kill('SIGKILL');
      }, this.timeout);

      proc.stdout.on('data', (d) => { stdout += d.toString(); });
      proc.stderr.on('data', (d) => { stderr += d.toString(); });

      proc.on('close', (code) => {
        clearTimeout(t);
        if (killed) {
          resolve({ stdout: '', stderr: 'timeout', exitCode: 124 });
        } else {
          resolve({ stdout: stdout.trim(), stderr: stderr.trim(), exitCode: code });
        }
      });

      proc.on('error', (err) => {
        clearTimeout(t);
        return reject(err);
      });

      // write stdin if present
      if (stdin) {
        proc.stdin.write(stdin);
        proc.stdin.end();
      }
    });
  }
}

module.exports = { DockerRunner };
