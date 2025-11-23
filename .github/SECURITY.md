# Security Policy

## Supported Versions

We release patches for security vulnerabilities. The following table shows which versions are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of ADAPT Lab Simulations seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do Not

- **Do not** open a public GitHub issue for security vulnerabilities
- **Do not** publicly disclose the vulnerability before it has been addressed

### Please Do

1. **Report the vulnerability privately** by:
   - Opening a private security advisory on GitHub (preferred)
   - Or emailing the details to the repository maintainers

2. **Include the following information** in your report:
   - Type of vulnerability (e.g., XSS, CSRF, injection, etc.)
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue, including how an attacker might exploit it

3. **Wait for a response**: We aim to respond to security reports within 48 hours

### What to Expect

After you submit a report:

1. **Acknowledgment**: We'll acknowledge receipt of your vulnerability report
2. **Assessment**: We'll assess the vulnerability and determine its impact
3. **Fix Development**: We'll work on a fix for the vulnerability
4. **Disclosure**: We'll coordinate with you on the disclosure timeline
5. **Credit**: If you wish, we'll credit you for the discovery in the security advisory

### Security Update Process

When we receive a security report:

1. We confirm the problem and determine affected versions
2. We audit the code to find similar problems
3. We prepare fixes for all supported versions
4. We release new versions with the fix as soon as possible
5. We publish a security advisory on GitHub

## Security Best Practices for Contributors

If you're contributing to this project, please follow these security best practices:

### Code Security

- **Input Validation**: Always validate and sanitize user input
- **XSS Prevention**: Use React's built-in XSS protection; avoid `dangerouslySetInnerHTML`
- **Dependencies**: Keep dependencies up to date and review them for vulnerabilities
- **Secrets**: Never commit API keys, passwords, or other sensitive data
- **Authentication**: Implement proper authentication and authorization checks
- **HTTPS**: Always use HTTPS in production environments

### Development Environment

- Use environment variables for sensitive configuration
- Keep your local development environment secure and up to date
- Use strong passwords for any development services
- Enable two-factor authentication on your GitHub account

### Dependency Management

- Regularly run `pnpm audit` to check for known vulnerabilities
- Review dependency updates before merging them
- Use specific versions in `package.json` rather than ranges when possible
- Be cautious when adding new dependencies

### Code Review

- Review code changes for potential security issues
- Look for common vulnerabilities like:
  - SQL injection
  - Cross-site scripting (XSS)
  - Cross-site request forgery (CSRF)
  - Insecure direct object references
  - Security misconfigurations

## Known Security Considerations

This is a demonstration/educational project. If you're using this code in production:

1. **Authentication**: Implement proper user authentication (currently using mock user)
2. **API Security**: Add proper API authentication and rate limiting
3. **Data Validation**: Implement server-side validation for all inputs
4. **CORS Configuration**: Configure CORS properly for your deployment
5. **Environment Variables**: Use environment variables for all sensitive configuration
6. **Security Headers**: Implement security headers (CSP, HSTS, etc.)
7. **Rate Limiting**: Add rate limiting to prevent abuse

## Security Tools and Resources

We recommend using these tools to help identify security issues:

- **npm audit** / **pnpm audit**: Check for known vulnerabilities in dependencies
- **ESLint security plugins**: Detect potential security issues in code
- **Snyk**: Continuous security monitoring
- **OWASP ZAP**: Web application security scanner
- **GitHub Security Advisories**: Stay informed about vulnerabilities

## Disclosure Policy

We believe in responsible disclosure:

- We'll work with you to understand and resolve the issue quickly
- We'll keep you informed throughout the process
- We'll publicly acknowledge your responsible disclosure (if you wish)
- We won't take legal action against security researchers who report vulnerabilities in good faith

## Security Updates

To stay informed about security updates:

- Watch this repository on GitHub
- Enable security alerts in your GitHub settings
- Check the security advisories section regularly

## Contact

For security-related questions or concerns that are not vulnerabilities, please open a discussion on GitHub.

---

Thank you for helping keep ADAPT Lab Simulations and our users safe!
