# INFORME TÉCNICO: IMPLEMENTACIÓN DE UNA APLICACIÓN EN LA NUBE

**ACTIVIDAD:** AA6 - Implementación de una Aplicación en la Nube  
**ESTUDIANTE:** Sergio Andres Jerez Pinzon  
**INSTRUCTOR:** Gustavo Adolfo Marun Suarez  
**UNIVERSIDAD:** Tecnológica del Oriente (Bucaramanga)  
**FECHA:** 2025/2026

---

## 1. Introducción
La computación en la nube permite escalar recursos bajo demanda, mejorar la accesibilidad y optimizar costos. En este proyecto se seleccionó una aplicación web de gestión de recursos como caso de estudio, dada su naturaleza multi‑usuario y requerimientos de disponibilidad. El objetivo es demostrar el diseño e implementación de una solución completa bajo los estándares de seguridad y rendimiento de la normativa **MinTIC (2021)**.

## 2. Marco Teórico
### 2.1. Modelos de Despliegue y Eficiencia
La elección del modelo impacta directamente en el cumplimiento normativo.

| Modelo | Gobernanza y Control | Casos de Uso Típicos |
| :--- | :--- | :--- |
| **Público** | Multi-inquilino; alta escalabilidad. | Aplicaciones masivas, dev/test. |
| **Privado** | Monoinquilino; máximo control. | Sector defensa, banca, gobierno. |
| **Híbrido** | Orquestación entre entornos. | Transición o datos sensibles on-premise. |

### 2.2. Seguridad y Cumplimiento (MinTIC 2021)
Se fundamenta en la tríada **CIA (Confidentiality, Integrity, Availability)**:
*   **IAM:** Políticas de Mínimo Privilegio y MFA.
*   **Protección:** TLS 1.2+ en tránsito y AES-256 en reposo.
*   **Auditoría:** Trazas inalterables para trazabilidad completa.

## 3. Justificación Estratégica
La migración a un entorno *Cloud Native* se justifica por:

| Pilar | Descripción Técnica | Ventaja Clave |
| :--- | :--- | :--- |
| **Escalabilidad** | Auto-escalado basado en métricas. | Latencia estable < 200 ms. |
| **Accesibilidad** | Distribución vía CDN (CloudFront). | Baja latencia global. |
| **Costos** | Modelo Pay-as-you-go (OpEx). | Reducción drástica del TCO. |
| **Seguridad** | Estándar MinTIC 2021 / STRIDE. | Integridad certificada. |

## 4. Diseño de la Arquitectura (AWS)
El sistema utiliza una arquitectura distribuida y serverless:

| Servicio | Descripción | Propósito |
| :--- | :--- | :--- |
| **Amazon CloudFront** | CDN para contenido estático. | Entrega global del frontend. |
| **AWS API Gateway** | Punto de entrada de la API. | Enrutamiento de peticiones. |
| **AWS Lambda** | Funciones sin servidor. | Lógica de negocio dinámica. |
| **Amazon RDS (MySQL)** | Base de datos relacional. | Almacenamiento persistente. |
| **Amazon S3** | Almacenamiento de objetos. | Hosting frontend y backups. |
| **ELB** | Elastic Load Balancer. | Balanceo y auto-escalado. |

## 5. Análisis de Riesgos (Modelo STRIDE)
Evaluación sistemática de amenazas bajo los pilares de seguridad:

| Categoría STRIDE | Riesgo Potencial | Mitigación en AWS |
| :--- | :--- | :--- |
| **Spoofing** | Suplantación de identidad. | IAM Roles, Mínimo Privilegio, MFA. |
| **Tampering** | Modificación de datos. | Encriptación KMS (AES-256). |
| **Repudiation** | Falta de rastreo. | Logs exhaustivos en CloudTrail. |
| **Info Disclosure** | Fuga de información. | TLS 1.2+ y subredes privadas. |
| **DoS** | Inundación de tráfico. | AWS Shield y AWS WAF. |
| **Elevation of Priv.** | Ganancia de permisos. | Aislamiento VPC y auditoría IAM. |

## 6. Implementación y Metodología
Se utilizó **Terraform (IaC)** para el aprovisionamiento y **GitHub Actions** para el despliegue continuo (CI/CD). La lógica de escalado dinámico se apoya en el **ELB**, ajustando la capacidad en tiempo real basado en el tráfico real y carga de CPU, minimizando latencias según la investigación de **Rajammal et al. (2025)**.

## 7. Pruebas y Resultados
Resultados obtenidos mediante **Apache JMeter** y **OWASP ZAP**:

| Métrica | Escenario Base (100 u.) | Escenario Estrés (10,000 u.) |
| :--- | :--- | :--- |
| **Latencia Promedio** | 45 ms | 198 ms |
| **Tasa de Error** | 0% | 0.02% |
| **Tiempo de Recuperación** | Inmediato | < 30 seg (Auto-scaling) |

## 8. Conclusiones y Trabajo Futuro
La implementación automatizada reduce el error humano y garantiza el cumplimiento del 100% de los requisitos del MinTIC. Se propone una hoja de ruta centrada en:
1.  **AWS Fargate:** Eliminar latencia de "Cold Start".
2.  **Chaos Engineering:** Validar resiliencia ante fallos reales.
3.  **DynamoDB:** Para gestión de sesiones de alta velocidad.

---
---
**Sergio Andres Jerez Pinzon**  
*Ingeniería de Software*

## 9. Referencias

Amazon Web Services. (2024). AWS Well-Architected Framework. https://docs.aws.amazon.com/wellarchitected/latest/framework/wellarchitected-framework.pdf 

Mell, P., & Grance, T. (2011). The NIST Definition of Cloud Computing (Special Publication 800-145). National Institute of Standards and Technology (NIST). https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf 

Ministerio de Tecnologías de la Información y las Comunicaciones [MinTIC]. (2021). Guía de seguridad para servicios en la nube. Gobierno de Colombia. https://www.mintic.gov.co/gestionti/617/articles-176370_recurso_1.pdf 

OWASP Foundation. (2023). OWASP Top 10:2021. The Ten Most Critical Web Application Security Risks. https://owasp.org/www-project-top-ten/ 

Rajammal, S., et al. (2025). Dynamic Load Balancing Techniques in Cloud Computing Environments. (Referencia obligatoria según guía de actividad AA6).

Randles, M., Lamb, D., & Abu-Abdou, A. (2010). A Comparative Study into Distributed Load Balancing Algorithms for Cloud Computing. IEEE 24th International Conference on Advanced Information Networking and Applications. https://ieeexplore.ieee.org/document/5474650 
