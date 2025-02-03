<div align="center" style="margin-bottom: 59px;">
    This repository houses the <b>backend (REST-API) code</b> of Setoran Hafalan Services for <a href="dashboard.tif.uin-suska.ac.id">dashboard.tif.uin-suska.ac.id</a>
    </br>
    🔥 Designed to streamline the recitation submission process, particularly for UIN Suska Riau. 🔥
</div>

<div align="center" style="margin-bottom: 59px;">
  <a href="https://github.com/riaudevops/api-setoran-hafalan">
    <img width="650px" src="https://github.com/MFarhanZ1/MFarhanZ1/blob/master/API-ETSBPPSQL.png" alt="RTNEPSQL Logo" />
  </a>
</div>

<p align="center">
  Setoran Hafalan Services (new ver of iMemoraise): Integrated Quran Memorization Information System USR
  </br> 
  <i>(build with 💚💜 using: Express TS + Prisma-ORM + Bun + PostgreSQL)</i>
</p>

<div align="center">
  <a href="https://circleci.com/gh/riaudevops/api-setoran-hafalan">
    <img src="https://img.shields.io/circleci/project/github/riaudevops/api-setoran-hafalan/master.svg?style=flat-square" alt="CircleCI branch" />
  </a>
  <a href="https://github.com/riaudevops/api-setoran-hafalan/network">
    <img src="https://img.shields.io/github/forks/riaudevops/api-setoran-hafalan.svg" alt="GitHub Forks" />
  </a>
  <a href="https://github.com/riaudevops/api-setoran-hafalan/stargazers">
    <img src="https://img.shields.io/github/stars/riaudevops/api-setoran-hafalan.svg" alt="GitHub Stars" />
  </a>
  <a href="https://github.com/riaudevops/api-setoran-hafalan/issues">
    <img src="https://img.shields.io/github/issues/riaudevops/api-setoran-hafalan.svg" alt="GitHub Issues" />
  </a>
  <a href="https://github.com/riaudevops/api-setoran-hafalan/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/riaudevops/api-setoran-hafalan.svg" alt="GitHub License" />
  </a>
  <a href="https://coveralls.io/github/riaudevops/api-setoran-hafalan">
    <img src="https://coveralls.io/repos/github/riaudevops/api-setoran-hafalan/badge.svg" alt="Coverage Status" />
  </a>
</div>

---

[underconstruction]: https://img.shields.io/badge/Status-WIP-FFFF00?style=for-the-badge&logoColor=FFFF00

## ✨ What’s the deal with this services? ✨ // ✧˚ ༘ ⋆｡♡˚ ![underconstruction][underconstruction]

**Setoran Hafalan Services - 
or what we previously knew as iMemoraise** _(Integrated Quran Memorization Information System)_ is a comprehensive web application created to enhance the management and tracking of Quran recitations. This system is specifically designed to support educational institutions in overseeing and recording students' recitations, **which are mandatory for progressing to internships, seminars, final projects, and other academic activities.** By providing a streamlined platform for tracking these essential recitations, Setoran Hafalan Services simplifies the administrative process, ensuring that all requirements are met efficiently. This application is particularly tailored for use at [UIN Suska Riau](https://www.uin-suska.ac.id/), _where it aids in managing students' academic progress and compliance_ with Quran memorization prerequisites.

---

## ⚙️ Before You Begin

Before you start, we recommend familiarizing yourself with the essential components needed to build an Express TypeScript application using Prisma ORM, Bun, and PostgreSQL:

- **Express TypeScript** - Begin with the [Express Official Website](https://expressjs.com/). The [Express TypeScript Guide](https://expressjs.com/en/starter/typescript.html) provides an overview of using Express with TypeScript.
- **Prisma ORM** - Learn about Prisma ORM from the [Prisma Official Website](https://www.prisma.io/). The [Getting Started](https://www.prisma.io/docs/getting-started) guide will help you set up your database schema and integrate Prisma with your application.
- **Bun** - Visit the [Bun Official Website](https://bun.sh/) for information on Bun, a fast JavaScript runtime. Check out the [Getting Started](https://bun.sh/docs/getting-started) guide for installation and usage instructions.
- **PostgreSQL** - Start with the [PostgreSQL Official Website](https://www.postgresql.org/). The [Documentation](https://www.postgresql.org/docs/) provides comprehensive information on setting up and managing PostgreSQL databases.

## 📝 Prerequisites

Ensure you have the following prerequisites installed on your development machine:

- **Git** - [Download & Install Git](https://git-scm.com/downloads). Git is commonly pre-installed on OSX and Linux machines.
- **Node.js** - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. For installation issues, refer to this [GitHub Gist](https://gist.github.com/isaacs/579814) for guidance.
- **Bun** - [Download & Install Bun](https://bun.sh/) for a fast JavaScript runtime environment.
- **PostgreSQL** - [Download & Install PostgreSQL](https://www.postgresql.org/download/) and ensure it's running on the default port (5432).
- **Prisma ORM** - Install Prisma using Bun. After setting up Node.js and Bun, follow the [Prisma installation guide](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project) to integrate Prisma with PostgreSQL.

---

## 🚀 Key Features of Setoran Hafalan Services

Setoran Hafalan Services is designed to enhance the management and tracking of Quran recitations for Academic Advisors and students. Here are the main features provided:

**For Academic Advisors:**

- **Recitation Management:** Monitor and track the progress of students' Quran recitations under their guidance. Review the completeness and accuracy of memorization progress.
- **Approval Process:** Listen to students' offline Quran recitations and assess their memorization progress, then approve or reject the recitations based on your assessment. Provide feedback directly to students to ensure they meet the required standards.

**For Students:**

- **Progress Tracking:** Keep an eye on the status of each recitation you’ve submitted later, monitor your own progress and view updates on the status of your recitations based on feedback from Academic Advisors. Students submit their recitations offline, and no online submission is required.

## 👣 Usage Scenario

Setoran Hafalan Services uses Keycloak for identity and access management. Keycloak handles authentication and authorization, providing secure access through its OAuth2 and OpenID Connect protocols.

**Here’s a simple scenario for logging in as an Academic Advisor or student:**

- **Account Setup:** Academic Advisors are assigned roles via Keycloak, which sets up accounts with default credentials. Advisors can reset their passwords for enhanced security.
- **Login:** Users authenticate via Keycloak using their credentials.
- **For Academic Advisors:** Manage and monitor offline recitations, approve or reject submissions based on your evaluation, then provide live feedback to students to help them meet the required memorization standards.
- **For Students:** Track your recitation progress and receive feedback on your offline submissions.

## 🤝 Contributing

Contributions are crucial for improving Setoran Hafalan Services. We welcome and value any help or suggestions.

To contribute, fork the repository, create a pull request, or open a new issue to discuss potential enhancements. Don’t forget to star the repository if you find it helpful! Thank you for your support!

---

## 📙 License

[No-License](LICENSE.md) // ✧˚ ༘ ⋆｡♡˚
[![License](https://img.shields.io/github/license/riaudevops/api-setoran-hafalan.svg)](https://github.com/riaudevops/api-setoran-hafalan/blob/master/LICENSE)
