SSL/TLS scanners are tools that check for security vulnerabilities in SSL/TLS
implementations. However, many of these scanners have several issues that make
them more harmful than helpful:

-   **False Positives**: These scanners often generate false positive results,
    indicating a vulnerability that doesn't actually exist, causing unnecessary
    confusion and wasted time. For example, the SSLscan tool, developed by Ian
    Ventura-Whiting, has been known to generate false positive results for
    certain vulnerabilities. False positive results from SSL/TLS scanners can
    lead businesses to invest time and resources into fixing security issues
    that don't actually exist, or to ignore real security issues that are not
    identified by the scanner.
-   **Outdated information**: The SSL/TLS landscape changes rapidly and many
    scanners rely on outdated information, meaning they may miss new threats or
    report false vulnerabilities. For example, the SSLyze tool, developed by
    Alessandro Ghedini, was last updated in 2018 and may miss new threats that
    have emerged since then. Outdated SSL/TLS scanners may not detect new
    security threats or vulnerabilities, leading businesses to be vulnerable to
    cyber attacks that could result in data breaches, financial losses, and harm
    to their reputation.
-   **Simplification**: SSL/TLS configurations can be complex, but many scanners
    simplify the information they provide, making their advice misleading and
    potentially harmful. The process of simplification often involves losing
    actionable context, such as specific implementation details, that is
    essential for making informed decisions and taking appropriate actions. For
    example, the SSL Labs tool, developed by Qualys, provides a simple rating
    system for websites, but the information provided is often too simplified
    and may not accurately reflect the true security of a website. Simplified
    information from SSL/TLS scanners can give businesses a false sense of
    security and lead them to neglect important security measures, making them
    more vulnerable to cyber attacks.
-   **Neglect**: Many free SSL/TLS scanners are neglected by their developers,
    meaning they are not updated with the latest security patches or new
    features to address new threats. One example of this is Qualys SSL Labs, a
    free SSL/TLS scanner, which was initially well-regarded for its
    comprehensive and accurate assessments of SSL/TLS security. However, over
    time, the tool became less maintained and more outdated, leading to
    increased criticism from the security community. : Neglect of SSL/TLS
    scanners can result in security vulnerabilities going undetected for long
    periods of time, increasing the risk of cyber attacks and data breaches, and
    leading to financial losses and damage to a company's reputation.
-   **Abandonment**: Some free SSL/TLS scanners are abandoned by their
    developers, meaning they are no longer maintained and are no longer
    effective in detecting current security threats. For example, the Stunnel
    tool, developed by Michal Trojnara, was abandoned by its developer, making
    it no longer maintained and potentially less effective in detecting new
    security threats. Abandoned SSL/TLS scanners may become less effective in
    detecting new security threats and vulnerabilities, putting businesses at
    risk of cyber attacks and data breaches, and leading to financial losses and
    harm to their reputation.

In the case of Qualys SSL Labs, neglect led to incorrect security assessments
and potentially misleading advice, making it less useful as a security tool.
This highlights the importance of regularly reviewing and updating security
tools, including free ones, to ensure they remain accurate and effective in
identifying and mitigating security risks.

These issues negatively impact the reliability and effectiveness of free
security tools, and businesses must carefully consider the maintenance and
update history of these tools before using them as part of their security
strategy. Regularly reviewing and updating security tools can help ensure they
continue to provide accurate and actionable information to help businesses
improve their security posture.

These impacts can be significant for businesses and can result in a loss of
trust from customers, legal and regulatory penalties, and a decrease in revenue
and profitability. It is therefore important for businesses to use SSL/TLS
scanners with caution and to take appropriate steps to ensure that they are
using reliable and up-to-date tools to assess the security of their online
assets.

In light of these risks, it is important for businesses to adopt a risk
management approach to their use of SSL/TLS scanners. This involves being
mindful of the limitations and issues associated with these tools, ensuring that
the tools are reliable and up-to-date, and taking appropriate steps to mitigate
the risks posed by these limitations and issues. Failure to properly manage the
risks associated with SSL/TLS scanners can lead to significant financial losses,
harm to a company's reputation, and a loss of trust from customers.

There are some general trends and observations about the usage of SSL/TLS
scanners:

-   **SSLscan**: It is a popular open-source tool for security professionals and
    is widely used for testing the security of SSL/TLS implementations. It is
    estimated to have a significant number of users and is widely regarded as a
    reliable tool for security assessments.
-   **SSLyze**: It is a popular open-source tool for security professionals and
    is widely used for testing the security of SSL/TLS implementations. It is
    estimated to have a significant number of users and is widely regarded as a
    reliable tool for security assessments.
-   **Qualyse SSL Labs**: It is a popular online service that provides security
    assessments for websites and is widely used by website owners, security
    professionals, and researchers. According to the SSL Labs website, it is
    used by hundreds of thousands of users each month.
-   **testssl.sh**: It is an open-source tool for testing SSL/TLS security and
    is widely used by security professionals and system administrators. It is
    estimated to have a significant number of users and is widely regarded as a
    reliable tool for security assessments.
-   **ImmuniWeb**: It is a commercial web security testing platform that
    provides a comprehensive security assessment for websites. It is estimated
    to have a significant number of users and is widely regarded as a reliable
    tool for security assessments. The exact number of users is not publicly
    available.

#### High-profile breaches related to ASM

-   **Equifax - In 2017**, Equifax suffered a data breach that affected over 147
    million customers worldwide, including customers in Australia. Equifax's
    data breach could have been avoided with regular security assessments,
    including the use of reliable and up-to-date SSL/TLS scanners. This would
    have detected the vulnerability in Equifax's website software and allowed
    the company to fix it before the breach occurred.
-   **Marriott International - In 2018**, Marriott International suffered a data
    breach that affected over 500 million customers worldwide, including
    customers in Australia. This breach was caused by a vulnerability in
    Marriott's Starwood reservation system, which could have been detected with
    a vulnerability scanner.
-   **Yahoo - In 2013 and 2014**, Yahoo suffered two data breaches that affected
    over 3 billion users worldwide, including users in Australia. These breaches
    were caused by vulnerabilities in Yahoo's systems and could have been
    detected with a proper security assessment, including the use of reliable
    and up-to-date SSL/TLS scanners.
-   **Uber - In 2016**, Uber suffered a data breach that affected over 57
    million customers and drivers worldwide, including customers and drivers in
    Australia. This breach was caused by a vulnerability in Uber's systems and
    could have been detected with a vulnerability scanner.
-   **Optus - In 2022**, Optus suffered a data breach due to an insecure API,
    which resulted in the exposure of customer data. This breach could have been
    prevented with a proper security assessment, including the use of reliable
    and up-to-date SSL/TLS scanners. Optus's data breach could have been avoided
    by implementing proper security measures, including the secure design and
    testing of their APIs.
-   **Medibank - In 2022**, Medibank suffered a data breach due to direct object
    referencing and enumeration. This breach resulted in the exposure of
    customer data and could have been prevented with a proper security
    assessment, including the use of a vulnerability scanner. Medibank's data
    breach could have been avoided by implementing proper security measures,
    including the secure design and testing of their systems to prevent direct
    object referencing and enumeration.
-   **Commonwealth Bank of Australia - In 2016**, the Commonwealth Bank of
    Australia suffered a data breach that affected nearly 20 million customers.
    This breach was caused by a vulnerability in the bank's systems, which could
    have been detected with attack surface monitoring.
-   **Amber Electric - In 2019**, Amber Electric, an Australian electrician
    services company, suffered a data breach that affected over 100,000
    customers. This breach was caused by a vulnerability in Amber Electric's
    website, which could have been detected with a proper security assessment.
-   **Australian Red Cross Blood Service - In 2016**, the Australian Red Cross
    Blood Service suffered a data breach that affected over 550,000 customers.
    This breach was caused by a vulnerability in the blood service's systems,
    which could have been detected with a proper security assessment.
-   **Capital One - In 2019**, Capital One suffered a data breach that affected
    over 100 million customers. This breach was caused by a vulnerability in the
    company's firewall configurations, which could have been detected with a
    proper security assessment.

Implementing remediation controls to address the above data breaches can help
reduce the risk of future breaches and protect businesses and their customers.
The cost of implementing these controls can vary widely depending on the size
and complexity of the business, but here are some general recommendations
include:

-   **Regular security assessments** - This includes the use of reliable and
    up-to-date SSL/TLS scanners, vulnerability scans, and penetration testing to
    detect and remediate vulnerabilities in a business's systems. The cost of
    these assessments can range from a few thousand dollars to tens of thousands
    of dollars per year, depending on the size and complexity of the business.
-   **Proper security measures** - This includes the secure design and testing
    of APIs, systems, and networks to prevent direct object referencing,
    enumeration, and other security threats. The cost of implementing these
    measures can range from a few thousand dollars to hundreds of thousands of
    dollars, depending on the size and complexity of the business.
-   **Incident response plan** - A well-defined incident response plan can help
    businesses quickly and effectively respond to a data breach, minimize the
    damage, and restore customer trust. The cost of developing and maintaining
    an incident response plan can range from a few thousand dollars to tens of
    thousands of dollars per year, depending on the size and complexity of the
    business.
-   **Employee training** - Regular training for employees on security best
    practices, such as safe password practices, can help reduce the risk of data
    breaches caused by human error. The cost of employee training can range from
    a few hundred dollars to several thousand dollars per year, depending on the
    size and complexity of the business.

It's important to remember that the cost of implementing these controls is far
less than the cost of a major data breach, which can result in significant
financial damages and loss of customer trust.

In addition to the remediation controls listed above, businesses can enhance
their security posture by utilizing free attack surface monitoring and threat
intelligence services. Trivial Security can provide real-time monitoring and
alerting for potential security threats, allowing businesses to take proactive
steps to remediate vulnerabilities and prevent data breaches, such as those
experienced by Equifax (credit reporting agency, 2017) and Optus
(telecommunications company, 2022) in recent years.

Qualys SSL Labs, a free SSL/TLS scanner, which was initially well-regarded for
its comprehensive and accurate assessments of SSL/TLS security. However, over
time, the tool became less maintained and more outdated, leading to increased
criticism from the security community.

Our free attack surface monitoring tools can help businesses identify and
monitor changes to their public-facing assets, such as websites and APIs, to
detect and alert on potential security threats. Threat intelligence services can
provide businesses with valuable information about emerging threats, allowing
them to prioritize and address potential security risks in a timely manner, as
was seen with the case of Medibank (health insurance company, 2022).

In the case of Qualys SSL Labs, neglect led to incorrect security assessments
and potentially misleading advice, making it less useful as a security tool.
This highlights the importance of regularly reviewing and updating security
tools, including free ones, to ensure they remain accurate and effective in
identifying and mitigating security risks.

By utilizing Trivial Security attack surface monitoring and threat intelligence
services, businesses can effectively monitor and mitigate potential security
threats without incurring additional costs. This can be a valuable resource for
small and medium-sized businesses looking to improve their security posture and
protect themselves and their customers from harm, without having to invest in
expensive solutions.
