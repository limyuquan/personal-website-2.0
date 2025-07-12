import Script from 'next/script';

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.limyuquan.com/#person",
        "name": "Yu Quan Lim",
        "givenName": "Yu Quan",
        "familyName": "Lim",
        "alternateName": ["YQ", "Yu Quan", "limyuquan"],
        "description": "Full-Stack Software Engineer and Computer Science student at NUS, Singapore",
        "url": "https://www.limyuquan.com",
        "image": "https://www.limyuquan.com/images/photos/limyuquan.jpg",
        "jobTitle": "Full-Stack Software Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "Razer",
          "url": "https://www.razer.com"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "National University of Singapore",
          "alternateName": "NUS",
          "url": "https://www.nus.edu.sg"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Singapore",
          "addressLocality": "Singapore"
        },
        "email": "limyuquan02@gmail.com",
        "sameAs": [
          "https://github.com/limyuquan",
          "https://linkedin.com/in/limyuquan",
          "https://www.limyuquan.com"
        ],
        "knowsAbout": [
          "React",
          "Next.js",
          "Python",
          "Go",
          "Java",
          "PHP",
          "Django",
          "FastAPI",
          "Flask",
          "Laravel",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "PostgreSQL",
          "MySQL",
          "AWS",
          "Docker",
          "Full-Stack Development",
          "Software Engineering",
          "Web Development"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Computer Science Degree",
            "educationalLevel": "Undergraduate",
            "credentialCategory": "Bachelor's Degree",
            "recognizedBy": {
              "@type": "EducationalOrganization",
              "name": "National University of Singapore"
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.limyuquan.com/#website",
        "url": "https://www.limyuquan.com",
        "name": "Yu Quan Lim - Full-Stack Software Engineer Portfolio",
        "description": "Personal portfolio website showcasing projects, experience, and skills of Yu Quan Lim, a Full-Stack Software Engineer and Computer Science student at NUS, Singapore.",
        "publisher": {
          "@id": "https://www.limyuquan.com/#person"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.limyuquan.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.limyuquan.com/#webpage",
        "url": "https://www.limyuquan.com",
        "name": "Yu Quan Lim - Full-Stack Software Engineer & Computer Science Student",
        "description": "Yu Quan Lim is a passionate Full-Stack Software Engineer and Computer Science student at NUS, Singapore. Specializing in React, Next.js, Python, Go, and modern web technologies.",
        "isPartOf": {
          "@id": "https://www.limyuquan.com/#website"
        },
        "about": {
          "@id": "https://www.limyuquan.com/#person"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.limyuquan.com/images/og-image.jpg",
          "width": 1200,
          "height": 630
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.limyuquan.com"
            }
          ]
        }
      },
      {
        "@type": "CreativeWork",
        "@id": "https://www.limyuquan.com/#portfolio",
        "name": "Software Engineering Portfolio",
        "description": "Collection of software engineering projects and professional experience",
        "creator": {
          "@id": "https://www.limyuquan.com/#person"
        },
        "hasPart": [
          {
            "@type": "SoftwareApplication",
            "name": "Multitwitcher",
            "description": "Platform that allows you to watch multiple Twitch streamers at once, or switch between them with a single click",
            "url": "https://multitwitcher.vercel.app/",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "author": {
              "@id": "https://www.limyuquan.com/#person"
            },
            "programmingLanguage": ["React", "Next.js", "TypeScript", "Tailwind CSS"]
          },
          {
            "@type": "SoftwareApplication",
            "name": "Reflective Minds Journaling",
            "description": "Simple and intuitive platform to record daily thoughts and experiences with AI-powered features",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "author": {
              "@id": "https://www.limyuquan.com/#person"
            },
            "programmingLanguage": ["React", "Flask", "JavaScript", "Python", "MySQL"]
          }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.limyuquan.com/#services",
        "name": "Full-Stack Software Engineering Services",
        "description": "Professional software engineering services including web development, backend systems, and modern technology solutions",
        "provider": {
          "@id": "https://www.limyuquan.com/#person"
        },
        "serviceType": "Software Engineering",
        "areaServed": {
          "@type": "Country",
          "name": "Singapore"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Engineering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Full-Stack Web Development",
                "description": "End-to-end web application development using modern technologies"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Backend Development",
                "description": "Scalable backend systems and API development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Frontend Development",
                "description": "Responsive and interactive user interfaces"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 