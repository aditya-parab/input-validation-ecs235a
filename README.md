
# Background Research


# Introduction

In today's interconnected world, we rely on web applications for a multitude of tasks like online banking, social networking, etc. However, this increased reliance on web applications has unfortunately turned them into attractive targets for individuals with malicious intent who aim to exploit weaknesses for various nefarious purposes. These objectives can range from compromising data security and stealing identities to causing disruptions in services. We intend for this report to document the common vulnerabilities that web applications may possess and how to mitigate these.


# The Importance of Web Application Security

Web application security is vital for protecting data and services, preventing unauthorized access, data breaches, financial losses, reputational harm, and legal issues. Web applications face various threats like DDoS attacks, XSS, SQL injection, CSRF, and Clickjacking, which can result in data theft, service interruptions, website defacement, and sensitive information being compromised.

Here we will focus on  SQL injections and Cross-Site Scripting (XSS), which are the two most common types of attacks that target web applications.



1. SQL Injection

    SQL injection (SQLi) is a type of web security vulnerability that may permit an unauthorized party to control the queries an application sends to its database. Exploiting this vulnerability allows the attacker to access sensitive data that would normally be inaccessible. This may involve viewing information belonging to other users or any data accessible to the application. Additionally, the attacker can potentially alter or delete this data, leading to lasting modifications in the application's content or functionality.

2. XSS Attack** \
**Cross-site scripting (XSS) attacks occur when untrusted data enters a web application, usually via a web request (attackers can inject malicious scripts into web pages viewed by other users), and is subsequently included in dynamic content sent to a web user without prior validation for malicious content.<sup>[1]</sup> Malicious content, often in the form of JavaScript or executable code, can compromise user data, session information, and take control of the user's browser. This leads to various nefarious activities by attackers using the vulnerable website as a disguise.

The consequences of such vulnerabilities to SQL Injection and XSS attacks can be dire. From reputation damage and financial losses to legal liabilities and regulatory penalties, organizations that fail to secure their web applications adequately face significant risks. As a result, there is an ongoing need for effective security measures that can prevent and mitigate these vulnerabilities.


# The Role of Input Validation

One approach to enhancing the security of web applications is the implementation of input validation. Input validation is the process of examining and verifying user inputs to ensure they conform to expected formats and data ranges before they are processed by the application. Input validation can help to prevent XSS and SQL injection attacks in the following ways:


## SQL injection: Input validation can be used to validate all user input that is used in database queries. This prevents malicious SQL code from being injected into the queries.


## XSS: Input validation can be used to escape special characters in user input. This prevents malicious JavaScript code from being executed.


# Project Objectives

The objectives of this project are as follows:



1. Implement a Vulnerable Web Application: Create a web application with known vulnerabilities, including SQL injection points and potential XSS attack vectors.
2. Design and Develop an Input Validation Wrapper: Construct an input validation wrapper capable of identifying and mitigating common security vulnerabilities, such as SQL injection and XSS.
3. Conduct Experiments: Deploy the vulnerable web application both with and without the input validation wrapper. Simulate attacks on both versions and record the results.
4. Measure and Analyze Performance: Analyze the differences in performance between the web application with and without the input validation wrapper.

Project Expected Outcomes



1. Gain insights into the real-world consequences of implementing an input validation wrapper on both the security and performance of web applications.
2. Assess the efficacy of this security measure in reducing common vulnerabilities.
3. Examine potential compromises or trade-offs between security and performance.


# BIBLIOGRAPHY


    **[1]** Cross site scripting (XSS). Cross Site Scripting (XSS) | OWASP Foundation. (n.d.). https://owasp.org/www-community/attacks/xss/#:~:text=Cross%2DSite%20Scripting%20(XSS)%20attacks%20occur%20when%3A,being%20validated%20for%20malicious%20content. 


    **[2]** Cross site scripting (XSS). Cross Site Scripting (XSS) | OWASP Foundation. (n.d.). https://owasp.org/www-community/attacks/xss/#:~:text=Cross%2DSite%20Scripting%20(XSS)%20attacks%20occur%20when%3A,being%20validated%20for%20malicious%20content. 


    **[3]** Banach, Z. (2022, August 30). Input validation errors: The root of all evil in web application security. Invicti. https://www.invicti.com/blog/web-security/input-validation-errors-root-of-all-evil/ 


    **[4]** Preventing input validation vulnerabilities in web ... - seclab. (n.d.-b). https://seclab.nu/static/publications/compsac2012input.pdf 


    **[5]** A. Alzahrani, A. Alqazzaz, Y. Zhu, H. Fu and N. Almashfi, "Web Application Security Tools Analysis," 2017 ieee 3rd international conference on big data security on cloud (bigdatasecurity), ieee international conference on high performance and smart computing (hpsc), and ieee international conference on intelligent data and security (ids), Beijing, China, 2017, pp. 237-242, doi: 10.1109/BigDataSecurity.2017.47.


    **[6]** Google. (n.d.). The basics of web hacking. Google Books. https://books.google.com/books?hl=en&amp;lr=&amp;id=qFIJaYv5bI4C&amp;oi=fnd&amp;pg=PP1&amp;dq=web%2Bsecurity%2Btechniques%2Band%2Btools&amp;ots=7YjziMm3hT&amp;sig=2jpTosNhWoIggZKlSXG9E6rJZ18#v=onepage&amp;q=web%20security%20techniques%20and%20tools&amp;f=false 


    **[7]** B. Nagpal, N. Singh, N. Chauhan, and A. Panesar, “Tool based implementation of sql injection for penetration testing,” in Computing, Communication & Automation (ICCCA), 2015 International Conference on. IEEE, 2015, pp. 746–749.


    **[8]** A. Shulman and C. Co-founder, “Top ten database security threats,” How to Mitigate the Most Significant Database Vulnerabilities, 2006.


    **[9] **XSSer. (2016) Cross site scripter: http://xsser.03c8.net/
