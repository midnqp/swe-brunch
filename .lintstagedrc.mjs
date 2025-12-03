export default {
  "*.{ts,js,jsx,tsx}": (stagedFiles) => ['prettier --log-level error -w '+stagedFiles.join(' ')],  
}