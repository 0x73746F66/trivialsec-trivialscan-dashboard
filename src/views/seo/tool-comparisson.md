# SSL Certificate Examination by dnschecker.org

https://dnschecker.org/ssl-certificate-examination.php

Checks only that a Certificate chain was provided and the root Certificate exists, the leaf Certificate is not expired and matches the hostname. These are to ensure they are well-formed, this is not a security mechanism that could be described as 'verified' valid, it is just well-formed validation check.
It seems to only assemble and check one certificate chain.

# SSL Checker by thesslstore.com

https://www.thesslstore.com/ssltools/ssl-checker.php

Basically a tool that merely checks the server is able to establish a TLS connection, it is not intended for any security purposes other than validation the TLS characteristic of integrity exists and nothing more.

# Geekflare TLS Scanner and TLS Test

https://geekflare.com/tools/tls-test
https://geekflare.com/tools/tls-scanner

TLS Test will only validate which TLS protocol versions will establish a connection to the server.
TLS Scanner is a little better as it will test for some vulnerabilities and common server misconfigurations, but does little to validate the certificate chain and trust root stores. It also misses a vast amount of common issues, and a poor job at describing any risks, threats, and non-compliance.

# Web Server Tester by Wormly



# DigiCert SSL Installation Diagnostics Tool



# SSL Checker by SSL Shopper

https://www.sslshopper.com/ssl-checker.html

Checks only that a Certificate chain was provided and the root Certificate exists, the leaf Certificate is not expired and matches the hostname. These are to ensure they are well-formed, this is not a security mechanism that could be described as 'verified' valid, it is just well-formed validation check.
It seems to only assemble and check one certificate chain.

# Observatory by Mozilla



# testssl.sh

The system administrator standard for testing for SSL/TLS vulnerabilities, it has all the common known issues covered without false positives being an issue. However you can not use this tool to verify TLS trust as it 'dumbs-it-down' and misunderstands how trust stores are created and utilised in practice.
It seems to only assemble and check one certificate chain.
The report is very basic but concise, and the project is well maintained with many contributors and consistent releases.

# Qualys SSL Labs

The industry standard for testing for SSL/TLS vulnerabilities, it has all the common known issues covered without false positives being an issue. However you can not use this tool to verify TLS trust as it 'dumbs-it-down' or misunderstands trust at best, knowingly providing misleading information at worst.
The report is poorly designed and hard to understand, you need to go searching through community discussions or start a questions in a community to figure out the information in the report.
Qualys is public for use without registration, which is questionable ethics and good reason to keep the features very limited.

# SSL Security Test by ImmuniWeb

https://www.immuniweb.com/ssl

A great alternative to Qualys SSL Labs with a modern layout, more non-compliance checks, and the report has more information at a glance (you don't need to go searching for community discussions or start a questions in a community to figure out the information in the report).
It seems to not assemble but will check the assumed certificate chain sent by a server.
ImmuniWeb is public for use without registration, which is questionable ethics and good reason to keep the features very limited.

# CryptCheck



# SSL Test by fairssl.net

Checks only that a Certificate chain was provided and the root Certificate exists, the leaf Certificate is not expired and matches the hostname. These are to ensure they are well-formed, this is not a security mechanism that could be described as 'verified' valid, it is just well-formed validation check.
It seems to only assemble and check one certificate chain.

# SSLyze

https://github.com/nabla-c0d3/sslyze

A hacker favourite tool and is provided via kali Linux repositories. It is intentionally focussed on identification of exploits rather than complaince and has support for scanning non-HTTP servers which makes it stand out despite it's limitations. It has to be run by a developer and the results are presented for security prifessionals, so the learning curve and poor attention to details keeps it's usefulness to a niche (hackers) of a niche (developers) of a niche (security professionals).
Unfortunately (or fortunately) it misunderstands trust providing incorrect and useless results, which can make it impossible for defenders to gain any insights and slow down bad actors with (perhaps intentional) misinformation.
It seems to not assemble but will check the assumed certificate chain sent by a server.

# SSL Web Server Test by Wormly

https://www.wormly.com/test_ssl

Blatent wrapper for SSLyze without actually disclosing the license or attributing to the owner.

# SSLChecker.com

https://www.sslchecker.com/sslchecker

Checks only that a Certificate chain was provided and the root Certificate exists, the leaf Certificate is not expired and matches the hostname. These are to ensure they are well-formed, this is not a security mechanism that could be described as 'verified' valid, it is just well-formed validation check.
It seems to only assemble and check one certificate chain.

# SSL checker by GeoCerts

https://www.geocerts.com/ssl-checker

Checks only that a Certificate chain was provided and the root Certificate exists, the leaf Certificate is not expired and matches the hostname. These are to ensure they are well-formed, this is not a security mechanism that could be described as 'verified' valid, it is just well-formed validation check.
It seems to only assemble and check one certificate chain.
The Server Test is a white-labelled Qualys SSL Labs.

# Website Safety & Security Check by ssltrust.com.au

https://www.ssltrust.com.au/ssl-tools/website-security-check

Blatent wrapper for testssl.sh without actually disclosing the license or attributing to the owner.

# SSL Verification Tool by Liquid Web

https://sslcheck.liquidweb.com/

Checks only that the root Certificate exists, the leaf Certificate is not expired and matches the hostname. These are to ensure they are well-formed, this is not a security mechanism that could be described as 'verified' valid, it is just well-formed validation check.
It seems to only assemble and check one certificate chain.

# SSL Checker by Sectigo

https://sectigostore.com/ssl-tools/ssl-checker.php

Checks only that a Certificate chain was provided and the root Certificate exists, the leaf Certificate is not expired and matches the hostname. These are to ensure they are well-formed, this is not a security mechanism that could be described as 'verified' valid, it is just well-formed validation check.
It seems to only assemble and check one certificate chain.
