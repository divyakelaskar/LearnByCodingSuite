## 🔄 `git checkout <commit-hash>`
- 🕰️ Goes to an **exact point** in the repository's history.
- 🚫 **Cannot commit** in this "detached HEAD" state, as you’re not on a branch.
- 🧪 **Only for testing** code without making any actual changes.
- ℹ️ **Alternative**: `git switch --detach <commit-hash>` – a newer command with the same effect but less likely to be confused with `checkout` on branches or files.

---

## 🔄 `git reset`
- 🌐 **Happens locally**, only affects your working directory and staging area.
- ⚠️ **Not recommended** when collaborating, as it rewrites history, which can confuse others.
- Types:
  1. `--soft` : 📝 Keeps changes **staged**, moving the branch pointer to a previous commit without affecting the working directory or index.
  2. `--mixed` : 📝 Keeps changes **unstaged**, moving the branch pointer and leaving files in the working directory.
  3. `--hard` : ❌ **Discards all changes**, resetting the working directory, index, and branch pointer.
  
   **Tip**: `git reset --hard` is powerful but can lead to data loss if used carelessly. Consider making a backup branch if you’re not sure!

---

## ⏪ `git revert`
- 📜 Generates a **new commit** that undoes changes from a previous commit.
- 🔄 **Inverse** of the specified commit (e.g., if it added a file in the OG commit then revert commit removes it).
- 🌐 **Collaboration-friendly**: Since it doesn’t rewrite history, it’s often a better choice for teams than `reset`.

---


this will 2nd main branch for example...