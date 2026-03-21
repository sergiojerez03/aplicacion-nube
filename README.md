# AA6 - IMPLEMENTACIÓN DE UNA APLICACIÓN EN LA NUBE

Este proyecto es una aplicación web de gestión de recursos en la nube desarrollada para la actividad **AA6**. Implementa una arquitectura moderna, segura (MinTIC 2021) y altamente escalable utilizando los últimos estándares de la industria y la investigación académica de Rajammal et al. (2025).

## **Lenguajes y Tecnologías:**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-953DFA?style=for-the-badge&logo=lucide&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2294F2?style=for-the-badge&logo=recharts&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## **Descripción de la App Web:**
La aplicación es un **Panel de Monitoreo de Infraestructura en la Nube** que simula el comportamiento de un ecosistema distribuido y serverless. Sus funciones principales incluyen:
- **Monitoreo en Tiempo Real**: Visualización de demanda y carga del sistema (Rajammal 2025).
- **Auditoría de Seguridad**: Panel específico de cumplimiento normativo conforme a la guía de **MinTIC 2021**.
- **Gestión de Recursos**: Seguimiento de salud y tráfico de componentes como S3, Lambda, RDS y ELB.

## **Instalación y Configuración:**

### Requisitos Previos:
- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/)

### Pasos para ejecutar:
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sergiojerez03/aplicacion-nube.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador: `http://localhost:5173/`

## **Arquitectura del Sistema (AWS):**
La solución propone el despliegue de las siguientes capas:
- **CDN**: Amazon CloudFront para distribución estática.
- **Backend (Serverless)**: AWS Lambda y API Gateway (Node.js).
- **Base de Datos**: Amazon RDS (MySQL) administrada.
- **Almacenamiento**: Amazon S3 para recursos persistentes.
- **Infraestructura**: Balanceo Dinámico (ELB) con Auto-scaling.

---
**INTEGRANTE:** SERGIO ANDRES JEREZ PINZON  
**TUTOR:** GUSTAVO ADOLFO MARUN SUAREZ  
**UNIVERSIDAD:** TECNOLÓGICA DEL ORIENTE (BUCARAMANGA)  
**FECHA:** 2025/2026
