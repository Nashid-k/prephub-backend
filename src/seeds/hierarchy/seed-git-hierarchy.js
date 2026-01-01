
const gitCurriculum = {
  "Version_Control_Basics": {
    "git_fundamentals": [
      "What is Version Control",
      "Git Architecture (Local vs Remote)",
      "Git vs SVN/Mercurial",
      "Installing and Configuring Git",
      "The Three States (Modified, Staged, Committed)"
    ],
    "core_commands": [
      "Initializing Repositories (init)",
      "Staging Changes (add)",
      "Committing Snapshots (commit)",
      "Viewing History (log)",
      "Checking Status (status)"
    ],
    "file_management": [
      ".gitignore Patterns",
      "Global vs Local Ignore",
      "Removing Files (rm)",
      "Moving/Renaming Files (mv)",
      "Ignoring Tracked Files"
    ]
  },
  "Branching_Merging": {
    "branch_management": [
      "Creating and Switching Branches",
      "Detached HEAD State",
      "Deleting Branches (Safe vs Force)",
      "Renaming Branches",
      "Upstream Tracking"
    ],
    "merging_strategies": [
      "Fast-Forward Merge",
      "Recursive Merge Strategy",
      "Squash Merging",
      "Rebasing (Interactive & Standard)",
      "Merge vs Rebase Trade-offs"
    ],
    "conflict_resolution": [
      "Identifying Merge Conflicts",
      "Resolving Conflicts Manualy",
      "Abort, Continue, Skip Rebase",
      "Using Merge Tools (diff3)",
      "Rerere (Reuse Recorded Resolution)"
    ]
  },
  "Remote_Collaboration": {
    "remote_repos": [
      "Cloning Repositories",
      "Managing Remotes (add, remove, rename)",
      "Pushing Changes (push)",
      "Fetching vs Pulling",
      "Pruning Stale Remotes"
    ],
    "github_workflow": [
      "Forking Workflow",
      "Pull Requests (PRs)",
      "Code Review Process",
      "Syncing Forks",
      "GitHub CLI (gh)"
    ],
    "collaboration_models": [
      "Centralized Workflow",
      "Feature Branch Workflow",
      "Gitflow Workflow",
      "Trunk-Based Development",
      "Forking Workflow"
    ]
  },
  "Advanced_Git_Tools": {
    "undoing_changes": [
      "Unstaging Files (restore)",
      "Reverting Commits (revert)",
      "Resetting (Soft, Mixed, Hard)",
      "Amending Commits",
      "Recovering Lost Commits (reflog)"
    ],
    "productivity_tools": [
      "Stashing Changes (stash)",
      "Cherry-Picking Commits",
      "Git Aliases",
      "Worktrees",
      "Git Bisect for Bug Hunting"
    ],
    "git_internals": [
      "The .git Directory",
      "Git Objects (Blob, Tree, Commit, Tag)",
      "References (Heads, Tags, Remotes)",
      "Packfiles and Garbage Collection",
      "Plumbing vs Porcelain Commands"
    ]
  },
  "DevOps_Automation": {
    "git_hooks": [
      "Client-Side Hooks (pre-commit, pre-push)",
      "Server-Side Hooks (pre-receive)",
      "Husky for Hook Management",
      "Linting and Testing with Hooks",
      "Bypassing Hooks"
    ],
    "advanced_management": [
      "Submodules",
      "Subtrees",
      "Large File Storage (LFS)",
      "GitHub Actions Basics",
      "Protected Branches"
    ]
  }
};

export { gitCurriculum };
