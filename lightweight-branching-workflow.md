
# 🌿 Lightweight Branching Workflow 🌿

### 1. 🌟 Main branch stays stable. (useful when CI/CD is set.)
### 2. 🌱 Each developer creates a branch per feature (or per bug fix) with a meaningful name (`feature/login`, `fix/api-errors`, etc.).
### 3. 📥 After completing a task, open a pull request, and the other person reviews it. Then, merge into the main branch.
### 4. 🔄 If something breaks, you can easily revert that specific branch without affecting other work.

> [!TIP]
> Steps 3 and 4 are done with the platform UI.

<br>

<details>
  <summary>🔄 Scenario 1 : switch between branches & run/develop on them locally (<i>covers scenario when branch is created at remote and now you have track it locally and start development for first time</i>)</summary>
  
> [!IMPORTANT]  
> Create the branch on remote platform.

### 1. **Check for Available Branches**
   
   - **To see local branches:**
     ```powershell
     git branch
     ```
     This will list all the branches that you have locally.
   
   - **To see remote branches as well:**
     ```powershell
     git branch -a
     ```
     This will list both local and remote branches. Remote branches will be listed as `origin/branch-name`.

### 2. **Fetch Latest Updates**
   If you want to make sure you have the latest branches and updates from the remote repository, run:
   ```powershell
   git fetch
   ```
   This will update your local knowledge of the remote repository, pulling down new branches and commits without modifying your working directory.

### 3. **Switch to the Desired Branch**
   Use the `git checkout` or `git switch` command to change to the branch you want to work on or run.

   - **If the branch is remote (you don’t have it locally yet), you can check it out directly like this:**
     ```powershell
     git checkout -b branch-name origin/branch-name
     ```
     This command:
     - Creates a local branch named `branch-name`.
     - Tracks the remote branch `origin/branch-name`.
  
> [!IMPORTANT]  
> Keep local and remote branch names the same for simplicity.

### 4. **Install Dependencies then run project**
   The process will depend on your specific setup.

### 5. **Making Changes and Committing on Another Branch (can be done with VSCode UI as well)**
   Once you're on the correct branch, you can start making changes to files, add them to staging, and commit them.

   - **Staging changes:**
     ```powershell
     git add <file>
     ```
   
   - **Committing changes:**
     ```powershell
     git commit -m "Your commit message"
     ```

### 6. **Pushing Changes to Remote (can be done with VSCode UI as well)**
   If you made changes and want to push them to the remote repository, do the following:
   ```powershell
   git push origin branch-name
   ```

</details>

<br>

<details>
  <summary>🔧 Scenario 2 : Reworking a Merged Branch (After Other Devs Have Pushed Changes)</summary>

## 1. Switch to branch:
```powershell
git checkout branch-name
```
## 2. Fetch changes done in remote main to your local branch:
```powershell
git fetch origin main
```
## 3. Apply changes done in remote main to your local branch:
```powershell
git merge origin/main
```
## 4. Push local branch changes done to remote branch:
```powershell
git push origin branch-name
```
</details>

<br>

<details>
  <summary>🐞 Scenario 3 : Reverting to a Previous Commit After a Bug is Discovered Post-Merge</summary>

### 1. **Identify the Commit to Revert to**

- Use the following command to list recent commits and find the one you want to revert to:
  ```bash
  git log
  ```
  This will show you a list of commits with commit hashes (e.g., `abc123`). Also available at platform UI.

### 2. **Create a New Branch to Apply the Fix**

- It's a good practice to create a new branch for the revert operation to isolate changes:
  ```bash
  git checkout -b fix/revert-bug
  ```

### 3. **Revert the Commit**

- Use the `git revert` command to undo the specific commit that introduced the bug (replace `abc123` with the actual commit hash):
  ```bash
  git revert abc123
  ```
  This will create a new commit that undoes the changes made in the specified commit.

### 4. **Test the Reverted Code**

### 5. **Push the Fix to Remote and Open a Pull Request**

- Push the revert changes to the remote branch:
  ```bash
  git push origin fix/revert-bug
  ```
  
- Create a pull request to merge the revert fix into the main branch.

### 6. **Merge the Fix into Main**

</details>

<br>

<details>
  <summary>🔄 Scenario 4 : Updating an old branch with latest main branch</summary>

### 1. **Switch to the Old Branch**
   ```bash
   git checkout branch-name
   ```

### 2. **Fetch Changes from Remote**
   ```bash
   git fetch origin
   ```

### 3. **Merge Changes from Main into Your Old Branch**
   ```bash
   git merge origin/main
   ```

### 4. **Resolve Any Merge Conflicts (if any)**  
   If there are conflicts, Git will prompt you to resolve them manually. After resolving, stage the changes:
   ```bash
   git add <file>
   ```

### 5. **Commit the Merge**
   Once conflicts are resolved and staged, complete the merge:
   ```bash
   git commit
   ```

### 6. **Push the Updated Branch to Remote**
   ```bash
   git push origin branch-name
   ```

</details>

<br>

<details>
  <summary>🗑️ Scenario 5 : To delete a branch at the remote and reflect that change locally</summary>


### 1. **Delete the Branch on the Remote:**
   Use the following command to delete the branch from the remote repository. For example, if your remote is named `origin` and your branch is called `branch_name`, the command would be:

   ```bash
   git push origin --delete branch_name
   ```

   This deletes the branch from the remote.

### 2. **Delete the Branch Locally:**
   If you also want to delete the branch locally (optional), run:

   ```bash
   git branch -d branch_name
   ```

   If the branch hasn't been merged, you might have to use `-D` instead of `-d` to force delete it:

   ```bash
   git branch -D branch_name
   ```

### 3. **Update Local Tracking of Remote Branches:**
   To reflect the remote changes (removing the deleted branch) locally, you can clean up references to the deleted branch:

   ```bash
   git fetch -p
   ```

   The `-p` option tells `git fetch` to prune deleted branches from your local list of remote-tracking branches.
</details>
