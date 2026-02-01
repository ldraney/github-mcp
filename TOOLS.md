# Tool Index

All 327 tools organized by category. Auto-generated from source definitions.

## Table of Contents

- [repos](#repos) (20 tools)
- [issues](#issues) (17 tools)
- [pulls](#pulls) (15 tools)
- [users](#users) (16 tools)
- [actions](#actions) (17 tools)
- [orgs](#orgs) (16 tools)
- [search](#search) (7 tools)
- [activity](#activity) (16 tools)
- [checks](#checks) (10 tools)
- [gists](#gists) (17 tools)
- [git](#git) (13 tools)
- [projects](#projects) (21 tools)
- [teams](#teams) (15 tools)
- [apps](#apps) (8 tools)
- [billing](#billing) (6 tools)
- [codeScanning](#codescanning) (8 tools)
- [codeSecurity](#codesecurity) (7 tools)
- [codesOfConduct](#codesofconduct) (2 tools)
- [codespaces](#codespaces) (8 tools)
- [copilot](#copilot) (6 tools)
- [dependabot](#dependabot) (11 tools)
- [emojis](#emojis) (1 tool)
- [gitignore](#gitignore) (2 tools)
- [interactions](#interactions) (6 tools)
- [licenses](#licenses) (3 tools)
- [markdown](#markdown) (2 tools)
- [meta](#meta) (4 tools)
- [migrations](#migrations) (7 tools)
- [packages](#packages) (24 tools)
- [rateLimit](#ratelimit) (1 tool)
- [reactions](#reactions) (9 tools)
- [secretScanning](#secretscanning) (6 tools)
- [securityAdvisories](#securityadvisories) (6 tools)

---

## repos

Repository management tools (20 tools)

| Tool | Description |
|------|-------------|
| `github_repos_list` | List repositories for the authenticated user |
| `github_repos_list_for_org` | List repositories for an organization |
| `github_repos_list_for_user` | List public repositories for a user |
| `github_repos_get` | Get a repository by owner and name |
| `github_repos_create` | Create a new repository for the authenticated user |
| `github_repos_create_in_org` | Create a new repository in an organization |
| `github_repos_update` | Update a repository |
| `github_repos_delete` | Delete a repository (requires delete_repo scope) |
| `github_repos_list_branches` | List branches for a repository |
| `github_repos_get_branch` | Get a branch by name |
| `github_repos_list_commits` | List commits for a repository |
| `github_repos_get_commit` | Get a commit by SHA |
| `github_repos_compare_commits` | Compare two commits |
| `github_repos_get_content` | Get the contents of a file or directory |
| `github_repos_create_or_update_file` | Create or update a file in a repository |
| `github_repos_delete_file` | Delete a file from a repository |
| `github_repos_list_collaborators` | List collaborators for a repository |
| `github_repos_add_collaborator` | Add a collaborator to a repository |
| `github_repos_list_forks` | List forks of a repository |
| `github_repos_create_fork` | Create a fork of a repository |

## issues

Issue management tools (17 tools)

| Tool | Description |
|------|-------------|
| `github_issues_list` | List issues for a repository |
| `github_issues_list_for_user` | List issues assigned to the authenticated user |
| `github_issues_get` | Get an issue by number |
| `github_issues_create` | Create a new issue |
| `github_issues_update` | Update an issue |
| `github_issues_lock` | Lock an issue |
| `github_issues_unlock` | Unlock an issue |
| `github_issues_list_comments` | List comments on an issue |
| `github_issues_get_comment` | Get a comment by ID |
| `github_issues_create_comment` | Create a comment on an issue |
| `github_issues_update_comment` | Update a comment |
| `github_issues_delete_comment` | Delete a comment |
| `github_issues_list_labels` | List labels for a repository |
| `github_issues_add_labels` | Add labels to an issue |
| `github_issues_set_labels` | Set labels for an issue (replaces all existing labels) |
| `github_issues_remove_label` | Remove a label from an issue |
| `github_issues_list_assignees` | List users who can be assigned to issues |

## pulls

Pull request management tools (15 tools)

| Tool | Description |
|------|-------------|
| `github_pulls_list` | List pull requests for a repository |
| `github_pulls_get` | Get a pull request by number |
| `github_pulls_create` | Create a new pull request |
| `github_pulls_update` | Update a pull request |
| `github_pulls_merge` | Merge a pull request |
| `github_pulls_list_commits` | List commits on a pull request |
| `github_pulls_list_files` | List files changed in a pull request |
| `github_pulls_check_merged` | Check if a pull request has been merged |
| `github_pulls_list_reviews` | List reviews on a pull request |
| `github_pulls_get_review` | Get a review by ID |
| `github_pulls_create_review` | Create a review on a pull request |
| `github_pulls_submit_review` | Submit a pending review |
| `github_pulls_list_review_comments` | List review comments on a pull request |
| `github_pulls_create_review_comment` | Create a review comment on a pull request |
| `github_pulls_request_reviewers` | Request reviewers for a pull request |

## users

User management tools (16 tools)

| Tool | Description |
|------|-------------|
| `github_users_get_authenticated` | Get the authenticated user |
| `github_users_get_by_username` | Get a user by username |
| `github_users_update_authenticated` | Update the authenticated user profile |
| `github_users_list` | List all users (paginated) |
| `github_users_list_followers` | List followers of a user |
| `github_users_list_following` | List users that a user is following |
| `github_users_check_following` | Check if the authenticated user follows another user |
| `github_users_follow` | Follow a user |
| `github_users_unfollow` | Unfollow a user |
| `github_users_list_blocked` | List users blocked by the authenticated user |
| `github_users_block` | Block a user |
| `github_users_unblock` | Unblock a user |
| `github_users_list_emails` | List email addresses for the authenticated user |
| `github_users_add_email` | Add email addresses to the authenticated user |
| `github_users_list_ssh_keys` | List SSH signing keys for the authenticated user |
| `github_users_get_context` | Get contextual information about a user (hovercard) |

## actions

GitHub Actions workflow tools (17 tools)

| Tool | Description |
|------|-------------|
| `github_actions_list_repo_workflows` | List all workflows in a repository |
| `github_actions_get_workflow` | Get a specific workflow by ID or filename |
| `github_actions_get_workflow_usage` | Get the number of billable minutes used by a workflow |
| `github_actions_list_workflow_runs` | List all workflow runs for a repository or specific workflow |
| `github_actions_get_workflow_run` | Get a specific workflow run by ID |
| `github_actions_cancel_workflow_run` | Cancel a workflow run that is in progress |
| `github_actions_rerun_workflow` | Re-run an entire workflow run |
| `github_actions_list_jobs_for_workflow_run` | List all jobs for a specific workflow run |
| `github_actions_get_job` | Get a specific job from a workflow run |
| `github_actions_download_job_logs` | Get the download URL for job logs |
| `github_actions_list_artifacts` | List all artifacts for a repository |
| `github_actions_get_artifact` | Get a specific artifact by ID |
| `github_actions_delete_artifact` | Delete an artifact by ID |
| `github_actions_list_repo_secrets` | List all secrets available in a repository (names only, not values) |
| `github_actions_get_repo_secret` | Get metadata about a repository secret (not the value) |
| `github_actions_create_or_update_repo_secret` | Create or update a repository secret |
| `github_actions_delete_repo_secret` | Delete a repository secret by name |

## orgs

GitHub organization tools (16 tools)

| Tool | Description |
|------|-------------|
| `github_orgs_list` | List organizations for the authenticated user |
| `github_orgs_list_for_user` | List public organizations for a user |
| `github_orgs_get` | Get an organization by name |
| `github_orgs_update` | Update an organization |
| `github_orgs_list_members` | List members of an organization |
| `github_orgs_get_membership` | Get organization membership for a user |
| `github_orgs_set_membership` | Set organization membership for a user |
| `github_orgs_remove_member` | Remove a member from an organization |
| `github_orgs_list_pending_invitations` | List pending invitations for an organization |
| `github_orgs_create_invitation` | Create an invitation to join an organization |
| `github_orgs_cancel_invitation` | Cancel an organization invitation |
| `github_orgs_list_webhooks` | List webhooks for an organization |
| `github_orgs_get_webhook` | Get a webhook for an organization |
| `github_orgs_create_webhook` | Create a webhook for an organization |
| `github_orgs_update_webhook` | Update a webhook for an organization |
| `github_orgs_delete_webhook` | Delete a webhook for an organization |

## search

GitHub search tools (7 tools)

| Tool | Description |
|------|-------------|
| `github_search_repos` | Search for repositories on GitHub |
| `github_search_code` | Search for code across GitHub repositories |
| `github_search_issues_and_pull_requests` | Search for issues and pull requests across GitHub |
| `github_search_users` | Search for users on GitHub |
| `github_search_commits` | Search for commits across GitHub repositories |
| `github_search_topics` | Search for topics on GitHub |
| `github_search_labels` | Search for labels in a repository |

## activity

GitHub activity tools (16 tools)

| Tool | Description |
|------|-------------|
| `github_activity_list_public_events` | List public events across GitHub |
| `github_activity_list_repo_events` | List events for a repository |
| `github_activity_list_events_for_authenticated_user` | List events for the authenticated user |
| `github_activity_list_notifications_for_authenticated_user` | List notifications for the authenticated user |
| `github_activity_get_thread` | Get a notification thread by ID |
| `github_activity_mark_thread_as_read` | Mark a notification thread as read |
| `github_activity_mark_notifications_as_read` | Mark all notifications as read |
| `github_activity_list_stargazers_for_repo` | List users who have starred a repository |
| `github_activity_list_repos_starred_by_authenticated_user` | List repositories starred by the authenticated user |
| `github_activity_star_repo_for_authenticated_user` | Star a repository for the authenticated user |
| `github_activity_unstar_repo_for_authenticated_user` | Unstar a repository for the authenticated user |
| `github_activity_check_repo_is_starred_by_authenticated_user` | Check if a repository is starred by the authenticated user |
| `github_activity_list_watchers_for_repo` | List users watching a repository |
| `github_activity_list_repos_watched_by_authenticated_user` | List repositories watched by the authenticated user |
| `github_activity_set_repo_subscription` | Set a repository subscription (watch/ignore) for the authenticated user |
| `github_activity_delete_repo_subscription` | Delete a repository subscription (unwatch) for the authenticated user |

## checks

GitHub checks tools (10 tools)

| Tool | Description |
|------|-------------|
| `github_checks_list_for_ref` | List check runs for a commit ref (branch name, tag, or SHA) |
| `github_checks_list_for_suite` | List check runs in a check suite |
| `github_checks_get` | Get a specific check run by ID |
| `github_checks_create` | Create a new check run for a specific commit SHA |
| `github_checks_update` | Update an existing check run |
| `github_checks_list_suites_for_ref` | List check suites for a commit ref (branch name, tag, or SHA) |
| `github_checks_get_suite` | Get a specific check suite by ID |
| `github_checks_create_suite` | Manually create a check suite for a commit |
| `github_checks_rerequest_suite` | Trigger a rerequest of a check suite |
| `github_checks_list_annotations` | List annotations for a check run (issues, warnings, or notices) |

## gists

GitHub gist tools (17 tools)

| Tool | Description |
|------|-------------|
| `github_gists_list` | List gists for the authenticated user |
| `github_gists_list_public` | List all public gists |
| `github_gists_list_starred` | List starred gists for the authenticated user |
| `github_gists_list_for_user` | List public gists for a user |
| `github_gists_get` | Get a gist by ID |
| `github_gists_create` | Create a new gist |
| `github_gists_update` | Update a gist |
| `github_gists_delete` | Delete a gist |
| `github_gists_fork` | Fork a gist |
| `github_gists_star` | Star a gist |
| `github_gists_unstar` | Unstar a gist |
| `github_gists_check_is_starred` | Check if a gist is starred by the authenticated user |
| `github_gists_list_comments` | List comments on a gist |
| `github_gists_get_comment` | Get a comment on a gist |
| `github_gists_create_comment` | Create a comment on a gist |
| `github_gists_update_comment` | Update a comment on a gist |
| `github_gists_delete_comment` | Delete a comment on a gist |

## git

Low-level Git operations (13 tools)

| Tool | Description |
|------|-------------|
| `github_git_get_blob` | Get a blob by SHA |
| `github_git_create_blob` | Create a blob |
| `github_git_get_commit` | Get a Git commit object by SHA |
| `github_git_create_commit` | Create a new Git commit object |
| `github_git_get_ref` | Get a Git reference (e.g., heads/main, tags/v1.0) |
| `github_git_list_matching_refs` | List references matching a prefix (e.g., heads/, tags/) |
| `github_git_create_ref` | Create a Git reference (branch or tag) |
| `github_git_update_ref` | Update a Git reference to point to a new SHA |
| `github_git_delete_ref` | Delete a Git reference (branch or tag) |
| `github_git_get_tag` | Get a Git tag object by SHA |
| `github_git_create_tag` | Create a Git tag object (annotated tag) |
| `github_git_get_tree` | Get a Git tree object by SHA |
| `github_git_create_tree` | Create a Git tree object |

## projects

GitHub projects tools (21 tools)

| Tool | Description |
|------|-------------|
| `github_projects_list_for_repo` | List projects for a repository |
| `github_projects_list_for_org` | List projects for an organization |
| `github_projects_list_for_user` | List projects for a user |
| `github_projects_get` | Get a project by ID |
| `github_projects_create_for_repo` | Create a project for a repository |
| `github_projects_create_for_org` | Create a project for an organization |
| `github_projects_create_for_user` | Create a project for the authenticated user |
| `github_projects_update` | Update a project |
| `github_projects_delete` | Delete a project |
| `github_projects_list_columns` | List columns in a project |
| `github_projects_get_column` | Get a project column by ID |
| `github_projects_create_column` | Create a column in a project |
| `github_projects_update_column` | Update a project column |
| `github_projects_delete_column` | Delete a project column |
| `github_projects_list_cards` | List cards in a project column |
| `github_projects_get_card` | Get a project card by ID |
| `github_projects_create_card` | Create a card in a project column |
| `github_projects_update_card` | Update a project card |
| `github_projects_delete_card` | Delete a project card |
| `github_projects_move_card` | Move a project card to a different position or column |
| `github_projects_move_column` | Move a project column to a different position |

## teams

GitHub teams tools (15 tools)

| Tool | Description |
|------|-------------|
| `github_teams_list` | List all teams in an organization |
| `github_teams_get_by_name` | Get a team by its slug name |
| `github_teams_create` | Create a new team in an organization |
| `github_teams_update` | Update a team in an organization |
| `github_teams_delete` | Delete a team from an organization |
| `github_teams_list_members_in_org` | List members of a team in an organization |
| `github_teams_get_membership_for_user_in_org` | Get team membership for a user in an organization |
| `github_teams_add_or_update_membership_for_user_in_org` | Add or update team membership for a user |
| `github_teams_remove_membership_for_user_in_org` | Remove team membership for a user in an organization |
| `github_teams_list_repos_in_org` | List repositories for a team in an organization |
| `github_teams_add_or_update_repo_permissions_in_org` | Add or update team repository permissions |
| `github_teams_remove_repo_in_org` | Remove a repository from a team in an organization |
| `github_teams_list_discussions_in_org` | List discussions for a team in an organization |
| `github_teams_get_discussion_in_org` | Get a specific discussion for a team |
| `github_teams_create_discussion_in_org` | Create a discussion for a team in an organization |

## apps

GitHub Apps tools (8 tools)

| Tool | Description |
|------|-------------|
| `github_apps_get_authenticated` | Get the authenticated GitHub App |
| `github_apps_list_installations` | List installations for the authenticated GitHub App |
| `github_apps_get_installation` | Get a specific installation of the authenticated GitHub App |
| `github_apps_list_installation_repos_for_authenticated_user` | List repositories accessible in an installation |
| `github_apps_create_installation_access_token` | Create an installation access token for a GitHub App |
| `github_apps_get_user_installation` | Get the installation for a specific user |
| `github_apps_get_repo_installation` | Get the installation for a specific repository |
| `github_apps_get_org_installation` | Get the installation for a specific organization |

## billing

GitHub billing tools (6 tools)

| Tool | Description |
|------|-------------|
| `github_billing_get_github_actions_billing_org` | Get GitHub Actions billing for an organization |
| `github_billing_get_github_actions_billing_user` | Get GitHub Actions billing for a user |
| `github_billing_get_github_packages_billing_org` | Get GitHub Packages billing for an organization |
| `github_billing_get_github_packages_billing_user` | Get GitHub Packages billing for a user |
| `github_billing_get_shared_storage_billing_org` | Get shared storage billing for an organization |
| `github_billing_get_shared_storage_billing_user` | Get shared storage billing for a user |

## codeScanning

Code scanning tools (8 tools)

| Tool | Description |
|------|-------------|
| `github_codeScanning_list_alerts_for_repo` | List code scanning alerts for a repository |
| `github_codeScanning_get_alert` | Get a specific code scanning alert by number |
| `github_codeScanning_update_alert` | Update the status of a code scanning alert |
| `github_codeScanning_list_recent_analyses` | List code scanning analyses for a repository |
| `github_codeScanning_get_analysis` | Get a specific code scanning analysis by ID |
| `github_codeScanning_delete_analysis` | Delete a code scanning analysis |
| `github_codeScanning_upload_sarif` | Upload a SARIF file containing code scanning results |
| `github_codeScanning_get_sarif` | Get information about a SARIF upload |

## codeSecurity

Code security configuration tools (7 tools)

| Tool | Description |
|------|-------------|
| `github_code_security_get_configurations_for_org` | Get all code security configurations for an organization |
| `github_code_security_get_configuration` | Get a code security configuration for an organization |
| `github_code_security_create_configuration` | Create a code security configuration for an organization |
| `github_code_security_update_configuration` | Update a code security configuration for an organization |
| `github_code_security_attach_configuration` | Attach repositories to a code security configuration |
| `github_code_security_detach_configuration` | Detach repositories from a code security configuration |
| `github_code_security_get_default_configurations` | Get default code security configurations for an organization |

## codesOfConduct

GitHub codes of conduct tools (2 tools)

| Tool | Description |
|------|-------------|
| `github_codesOfConduct_get_all_codes_of_conduct` | List all codes of conduct available on GitHub |
| `github_codesOfConduct_get_conduct_code` | Get a specific code of conduct by its key |

## codespaces

GitHub Codespaces tools (8 tools)

| Tool | Description |
|------|-------------|
| `github_codespaces_list_for_authenticated_user` | List codespaces for the authenticated user |
| `github_codespaces_list_in_repository_for_authenticated_user` | List codespaces in a repository for the authenticated user |
| `github_codespaces_get_for_authenticated_user` | Get a codespace by name |
| `github_codespaces_create_for_authenticated_user` | Create a codespace for the authenticated user |
| `github_codespaces_start_for_authenticated_user` | Start a codespace for the authenticated user |
| `github_codespaces_stop_for_authenticated_user` | Stop a codespace for the authenticated user |
| `github_codespaces_delete_for_authenticated_user` | Delete a codespace for the authenticated user |
| `github_codespaces_list_secrets_for_authenticated_user` | List secrets for the authenticated user for codespaces |

## copilot

GitHub Copilot tools (6 tools)

| Tool | Description |
|------|-------------|
| `github_copilot_get_copilot_organization_details` | Get Copilot for Business or Enterprise details for an organization |
| `github_copilot_list_copilot_seats` | List all Copilot seat assignments for an organization |
| `github_copilot_add_copilot_seats_for_teams` | Add Copilot seat assignments for teams |
| `github_copilot_add_copilot_seats_for_users` | Add Copilot seat assignments for users |
| `github_copilot_cancel_copilot_seat_assignment_for_teams` | Cancel Copilot seat assignments for teams |
| `github_copilot_cancel_copilot_seat_assignment_for_users` | Cancel Copilot seat assignments for users |

## dependabot

Dependabot alerts and secrets management tools (11 tools)

| Tool | Description |
|------|-------------|
| `github_dependabot_list_alerts_for_repo` | List Dependabot alerts for a repository |
| `github_dependabot_get_alert` | Get a specific Dependabot alert by number |
| `github_dependabot_update_alert` | Update a Dependabot alert (dismiss or reopen) |
| `github_dependabot_list_org_secrets` | List all Dependabot secrets available in an organization |
| `github_dependabot_get_org_secret` | Get metadata about an organization Dependabot secret |
| `github_dependabot_create_or_update_org_secret` | Create or update an organization Dependabot secret |
| `github_dependabot_delete_org_secret` | Delete an organization Dependabot secret by name |
| `github_dependabot_list_repo_secrets` | List all Dependabot secrets available in a repository |
| `github_dependabot_get_repo_secret` | Get metadata about a repository Dependabot secret |
| `github_dependabot_create_or_update_repo_secret` | Create or update a repository Dependabot secret |
| `github_dependabot_delete_repo_secret` | Delete a repository Dependabot secret by name |

## emojis

GitHub emojis tools (1 tool)

| Tool | Description |
|------|-------------|
| `github_emojis_get` | Get the list of all available GitHub emojis |

## gitignore

GitHub gitignore templates tools (2 tools)

| Tool | Description |
|------|-------------|
| `github_gitignore_get_all_templates` | List all available gitignore templates |
| `github_gitignore_get_template` | Get a specific gitignore template by name |

## interactions

GitHub interaction limits tools (6 tools)

| Tool | Description |
|------|-------------|
| `github_interactions_get_restrictions_for_repo` | Get interaction restrictions for a repository |
| `github_interactions_set_restrictions_for_repo` | Set interaction restrictions for a repository |
| `github_interactions_remove_restrictions_for_repo` | Remove interaction restrictions from a repository |
| `github_interactions_get_restrictions_for_org` | Get interaction restrictions for an organization |
| `github_interactions_set_restrictions_for_org` | Set interaction restrictions for an organization |
| `github_interactions_remove_restrictions_for_org` | Remove interaction restrictions from an organization |

## licenses

GitHub licenses tools (3 tools)

| Tool | Description |
|------|-------------|
| `github_licenses_get_all_commonly_used` | List commonly used open source licenses |
| `github_licenses_get` | Get a license by its SPDX key (e.g., "mit", "apache-2.0") |
| `github_licenses_get_for_repo` | Get the license for a repository |

## markdown

GitHub markdown tools (2 tools)

| Tool | Description |
|------|-------------|
| `github_markdown_render` | Render a markdown document |
| `github_markdown_render_raw` | Render raw markdown text |

## meta

GitHub API metadata tools (4 tools)

| Tool | Description |
|------|-------------|
| `github_meta_get` | Get GitHub API meta information including IP ranges, SSH keys, and more |
| `github_meta_get_octocat` | Get the octocat ASCII art with an optional custom message |
| `github_meta_get_zen` | Get a random GitHub zen quote |
| `github_meta_get_all_versions` | List all available GitHub API versions |

## migrations

GitHub migrations tools (7 tools)

| Tool | Description |
|------|-------------|
| `github_migrations_list_for_org` | List the most recent migrations for an organization |
| `github_migrations_start_for_org` | Start a migration for an organization |
| `github_migrations_get_status_for_org` | Get the status of an organization migration |
| `github_migrations_get_archive_for_org` | Download an organization migration archive |
| `github_migrations_delete_archive_for_org` | Delete an organization migration archive |
| `github_migrations_unlock_repo_for_org` | Unlock a repository that was locked for migration |
| `github_migrations_list_repos_for_org` | List the repositories in an organization migration |

## packages

GitHub packages tools (24 tools)

| Tool | Description |
|------|-------------|
| `github_packages_list_packages_for_authenticated_user` | List packages owned by the authenticated user |
| `github_packages_list_packages_for_user` | List packages for a user |
| `github_packages_list_packages_for_organization` | List packages for an organization |
| `github_packages_get_package_for_authenticated_user` | Get a package owned by the authenticated user |
| `github_packages_get_package_for_user` | Get a package for a user |
| `github_packages_get_package_for_organization` | Get a package for an organization |
| `github_packages_delete_package_for_authenticated_user` | Delete a package owned by the authenticated user |
| `github_packages_delete_package_for_user` | Delete a package for a user |
| `github_packages_delete_package_for_org` | Delete a package for an organization |
| `github_packages_list_versions_for_auth_user` | Get all package versions for the authenticated user |
| `github_packages_list_versions_for_user` | Get all package versions for a user |
| `github_packages_list_versions_for_org` | Get all package versions for an organization |
| `github_packages_get_package_version_for_authenticated_user` | Get a specific package version for the authenticated user |
| `github_packages_get_package_version_for_user` | Get a specific package version for a user |
| `github_packages_get_package_version_for_organization` | Get a specific package version for an organization |
| `github_packages_delete_package_version_for_authenticated_user` | Delete a package version for the authenticated user |
| `github_packages_delete_package_version_for_user` | Delete a package version for a user |
| `github_packages_delete_package_version_for_org` | Delete a package version for an organization |
| `github_packages_restore_package_for_authenticated_user` | Restore a package for the authenticated user |
| `github_packages_restore_package_for_user` | Restore a package for a user |
| `github_packages_restore_package_for_org` | Restore a package for an organization |
| `github_packages_restore_package_version_for_authenticated_user` | Restore a package version for the authenticated user |
| `github_packages_restore_package_version_for_user` | Restore a package version for a user |
| `github_packages_restore_package_version_for_org` | Restore a package version for an organization |

## rateLimit

GitHub rate limit tools (1 tool)

| Tool | Description |
|------|-------------|
| `github_rateLimit_get` | Get the rate limit status for the authenticated user |

## reactions

GitHub reactions tools (9 tools)

| Tool | Description |
|------|-------------|
| `github_reactions_list_for_issue` | List reactions for an issue |
| `github_reactions_list_for_issue_comment` | List reactions for an issue comment |
| `github_reactions_list_for_pull_request_review_comment` | List reactions for a pull request review comment |
| `github_reactions_create_for_issue` | Create a reaction for an issue |
| `github_reactions_create_for_issue_comment` | Create a reaction for an issue comment |
| `github_reactions_create_for_pull_request_review_comment` | Create a reaction for a pull request review comment |
| `github_reactions_delete_for_issue` | Delete a reaction for an issue |
| `github_reactions_delete_for_issue_comment` | Delete a reaction for an issue comment |
| `github_reactions_delete_for_pull_request_review_comment` | Delete a reaction for a pull request review comment |

## secretScanning

Secret scanning tools (6 tools)

| Tool | Description |
|------|-------------|
| `github_secretScanning_list_alerts_for_repo` | List secret scanning alerts for a repository |
| `github_secretScanning_list_alerts_for_org` | List secret scanning alerts for an organization |
| `github_secretScanning_list_alerts_for_enterprise` | List secret scanning alerts for an enterprise |
| `github_secretScanning_get_alert` | Get a single secret scanning alert by alert number |
| `github_secretScanning_update_alert` | Update the state of a secret scanning alert |
| `github_secretScanning_list_locations_for_alert` | List all locations where a secret was detected |

## securityAdvisories

Security advisories tools (6 tools)

| Tool | Description |
|------|-------------|
| `github_securityAdvisories_list_global_advisories` | List global security advisories from the GitHub Advisory Database |
| `github_securityAdvisories_get_global_advisory` | Get a global security advisory by its GHSA ID |
| `github_securityAdvisories_list_repository_advisories` | List security advisories for a repository |
| `github_securityAdvisories_get_repository_advisory` | Get a repository security advisory by its GHSA ID |
| `github_securityAdvisories_create_repository_advisory` | Create a new security advisory for a repository |
| `github_securityAdvisories_update_repository_advisory` | Update a repository security advisory |
