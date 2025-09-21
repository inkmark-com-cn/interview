import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "single-github-issue-viewer",
});

export async function getIssue(
  owner: string,
  repo: string,
  issueNumber: number
) {
  try {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner,
        repo,
        issue_number: issueNumber,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching issue:", error);
  }
}

export async function getIssueList(
  owner: string,
  repo: string,
  page: number = 1,
  perPage: number = 30
) {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner,
      repo,
      page,
      per_page: perPage,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching issue list:", error);
  }
}
