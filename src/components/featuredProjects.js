import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import styles from './featuredProjects.module.css'

const featuredProjectsQuery = graphql`
  query {
    allFeaturedProjectsJson {
      edges {
        node {
          id
          name
          slug
          description
          image {
            publicURL
          }
        }
      }
    }
  }
`

const transformData = data =>
  data.allFeaturedProjectsJson.edges.map(edge => edge.node)

const getImageSrc = image => (image ? image.publicURL : null)

const FeaturedProjects = () => {
  return (
    <StaticQuery
      query={featuredProjectsQuery}
      render={data => {
        const projects = transformData(data)
        return (
          <div className={styles.featuredProjects}>
            {projects.map(project => (
              <div className={styles.project} key={project.id}>
                <div className={styles.projectLogo}>
                  <img
                    className={styles.projectLogoImage}
                    src={getImageSrc(project.image)}
                    alt={project.name}
                  />
                </div>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <Link
                  className={styles.projectLink}
                  to={`/projetos/${project.slug}`}
                >
                  ver detalhes
                </Link>
              </div>
            ))}
          </div>
        )
      }}
    />
  )
}

export default FeaturedProjects