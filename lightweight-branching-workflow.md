# Main branch stays stable..

# Each developer creates a branch per feature (or per bug fix) with a meaningful name (`feature/login`, `fix/api-errors`, etc.).

# After completing a task, open a pull request, and the other person reviews it. Then, merge into the main branch.
   To locally run a different branch from your repository, you need to follow a few simple steps using Git. This will allow you to switch between branches, work on them, and run the project as needed. Here’s how you can do it:

   > [!IMPORTANT]  
   > Create the branch on remote platform then track it through a locally created branch.

   ### 1. **Check for Available Branches**
      
      - **To see local branches:**
      ```bash    
      git branch
      ```
      This will list all the branches that you have locally.
      
      - **To see remote branches as well:**
      ```bash
      git branch -a
      ```
      This will list both local and remote branches. Remote branches will be listed as `origin/branch-name`.

   ### 2. **Fetch Latest Updates** 
      If you want to make sure you have the latest branches and updates from the remote repository, run:
      ```bash
      git fetch
      ```
      This will update your local knowledge of the remote repository, pulling down new branches and commits without modifying your working directory.

   ### 3. **Switch to the Desired Branch**
      Use the `git checkout` or `git switch` command to change to the branch you want to work on or run.

      - **If the branch is remote (you don’t have it locally yet), you can check it out directly like this:**
      ```bash
      git checkout -b branch-name origin/branch-name
      ```
      This command:
      - Creates a local branch named `branch-name`.
      - Tracks the remote branch `origin/branch-name`.
   
   > [!IMPORTANT]  
   > Keep local and remote branch names same for simplicity.

   ### 4. **Install Dependencies (If Required)**
      If your project has dependencies (e.g., `npm`, `pip`, etc.), you may need to install them for that branch. Usually, this happens if there are different dependencies in this branch compared to the one you were working on before.

   ### 5. **Run the Project**
      The process will depend on your specific setup.

   ### 6. **Making Changes and Committing on Another Branch (can be done with VSCode UI as well)**
      Once you're on the correct branch, you can start making changes to files, add them to staging, and commit them.

      - **Staging changes:**
      ```bash
      git add <file>
      ```
      
      - **Committing changes:**
      ```bash
      git commit -m "Your commit message"
      ```

   ### 7. **Pushing Changes to Remote (can be done with VSCode UI as well)**
      If you made changes and want to push them to the remote repository, do the following:
      ```bash
      git push origin branch-name
      ```

   This process allows you to seamlessly switch between different branches and run or develop on them locally.

# If something breaks, you can easily revert that specific branch without affecting other work.

   When you work with Git branches, each branch is a separate line of development, so changes made in one branch are isolated from others. This means that if something goes wrong in a specific branch, you can revert the changes in that branch without affecting the code or work in other branches.

   ### 1. **Branch Isolation**
   Each Git branch represents an independent version of your project. When you create a branch, it copies the current state of the project (from the commit you're on) and allows you to make changes that only affect that branch.

   - If you’re working on a `feature/new-login` branch and make some experimental changes, they are **completely separate** from the `main` branch.
   - If those changes break something, the `main` branch remains unaffected.

   ### 2. **Reverting a Broken Branch**
   If something breaks in a specific branch, you have several options to undo or revert the problematic changes without affecting other branches. These options include resetting, reverting commits, or rolling back to a previous commit.

   #### **Option A: Undoing Commits with `git reset`**
   If you made a few recent commits that introduced the problem, you can use `git reset` to undo them.

   - **Soft reset**: Keeps your changes in the working directory but removes them from the commit history.
   ```bash
   git reset --soft HEAD~1
   ```
   This undoes the last commit but keeps the changes staged.

   - **Hard reset**: Completely discards the last commit and any changes associated with it.
   ```bash
   git reset --hard HEAD~1
   ```
   This will remove the last commit and any changes introduced by it.

   > **Important**: This only affects the current branch you’re on.

   #### **Option B: Reverting a Commit**
   If the problem was introduced by a specific commit, you can revert that commit without altering the commit history.

   - Use `git revert` to undo a specific commit by creating a new commit that undoes the changes:
   ```bash
   git revert <commit-hash>
   ```
   This creates a new commit that reverses the changes from the problematic commit.

   - Since this operation only modifies the branch you’re on, other branches are not impacted.

   #### **Option C: Rolling Back to a Stable Commit**
   If you realize that multiple commits have introduced problems, you can reset the branch to an earlier, stable commit. This will discard all commits after the stable point.

   - To reset a branch to an earlier commit:
   ```bash
   git reset --hard <stable-commit-hash>
   ```
   This completely removes all changes made after the `<stable-commit-hash>` and rolls the branch back to that state.

   ### 3. **Switching to a Stable Branch**
   If your current branch (e.g., `feature/new-login`) is broken, and you need to return to a stable version, you can simply switch to another branch (e.g., `main`) that is known to be working.

   ```bash
   git checkout main
   ```

   - Your `main` branch is untouched by the changes that broke the `feature/new-login` branch, so you can safely continue working or test on `main` while fixing the issue in `feature/new-login`.

   ### 4. **Merge and Avoid Affecting Other Branches**
   When using branches, you only merge code into the `main` branch or other branches when the feature or fix is complete and tested. If something goes wrong in your feature branch, you can fix it there without merging it into the `main` branch, thus **avoiding breaking the main or stable branch**.

   - If the branch is never merged, the issues in that branch will never affect the `main` branch.
   - If the branch was merged but later found to be problematic, you can revert the merge.

   #### **Reverting a Merge:**
   If a problematic branch has been merged into `main`, you can revert the merge without affecting other commits:

   ```bash
   git revert -m 1 <merge-commit-hash>
   ```

   This undoes the merge but leaves other parts of the `main` branch intact.

   ### 5. **Advantages of Reverting a Specific Branch:**
   - **Isolated problems**: If something breaks in a branch, it only affects that branch. The `main` branch or other feature branches are completely unaffected.
   - **Easy fix**: You can easily fix issues in the broken branch by reverting or resetting it, without worrying about affecting other branches.
   - **Safer development**: Each branch is a sandbox where you can experiment freely. Even if you make drastic changes and break things, other branches remain safe and unaffected.

# Conclusion
By isolating work in branches, you can revert specific changes or reset a broken branch without affecting the rest of the project. This flexibility makes Git branches a powerful tool for managing and fixing issues in a controlled manner, ensuring that the stable or main branch remains intact and reliable for deployment or further development.

a change done at the remote origin branch for testing...

something i did only for test branch 3
