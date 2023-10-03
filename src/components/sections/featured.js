import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:first-of-type {
    margin-top: 50px;
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--red);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    .featured_img {
      width: 100%;
      height: 100%;
      background-color: var(--red);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
              slideshow
              slideshow1
              document
              gif_cover
              project_type
            }
            html
          }
        }
      }
    }
  `);

  const StyledToggleButton = styled(ToggleButton)`
    && {
      background-color: ${props =>
        props.selectedValue === props.value ? 'var(--red)' : 'transparent'};
      color: ${props => (props.selectedValue === props.value ? 'var(--dark-navy)' : 'var(--red)')};
      border: 1px solid var(--red);
      font: var(--font-mono);
      font-size: var(--fz-md);
      text-transform: none;
      position: sticky;
      top: 60px;
      z-index: 1000;

      &:hover {
        background-color: var(--red);
        color: var(--primary-text-color);
      }
      &.Mui-selected {
        background-color: var(--red);
        color: --dark-navy;

        &:hover {
          background-color: var(--red);
        }
      }

      @media (max-width: 600px) {
        font-size: var(--fz-xxs);
      }
    }
  `;

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [selected, setSelected] = React.useState('all');
  // const [featuredProjectsFiltered, setFeaturedProjectsFiltered] = React.useState(featuredProjects.filter(({ node }) => node.frontmatter.project_type === selected));
  const [featuredProjectsFiltered, setFeaturedProjectsFiltered] = React.useState(featuredProjects);

  const handleSelection = (event, newSelection) => {
    if (newSelection != selected && newSelection != null) {
      setSelected(newSelection);

      if (newSelection === 'all') {
        setFeaturedProjectsFiltered(featuredProjects);
      } else {
        setFeaturedProjectsFiltered(
          featuredProjects.filter(({ node }) => node.frontmatter.project_type === newSelection),
        );
      }
    }
  };

  const proj_type_dict = {
    mlsp: 'ML and Signal Processing',
    simulation: 'Software Simulations',
    design: 'Engineering and Design',
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle} position="sticky" top="60px">
        Some of my Work
      </h2>

      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleSelection}
        aria-label="project filter">
        <StyledToggleButton value="all" selectedValue={selected}>
          All
        </StyledToggleButton>
        <StyledToggleButton value="mlsp" selectedValue={selected}>
          ML and Signal Processing
        </StyledToggleButton>
        <StyledToggleButton value="simulation" selectedValue={selected}>
          Software Simulations
        </StyledToggleButton>
        <StyledToggleButton value="design" selectedValue={selected}>
          Engineering and Design
        </StyledToggleButton>
      </ToggleButtonGroup>

      <StyledProjectsGrid>
        {featuredProjectsFiltered &&
          featuredProjectsFiltered.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const {
              external,
              title,
              tech,
              github,
              cover,
              slideshow,
              slideshow1,
              document,
              gif_cover,
              project_type,
            } = frontmatter;
            const image = getImage(cover);
            // console.log(gif_cover);
            // console.log(cover);
            // console.log(i);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-image">
                  {/* <a href={external ? external : github ? github : '#'}>
                    {gif_cover && <img src={gif_cover} alt={title} className="img feature-img" />}
                    {cover && <GatsbyImage image={image} alt={title} className="img feature-img" />}
                  </a> */}
                  <div className="featured_img">
                    {gif_cover && <img src={gif_cover} alt={title} className="img" />}
                    {cover && <GatsbyImage image={image} alt={title} className="img" />}
                  </div>
                </div>
                <div className="project-content">
                  <div>
                    <p className="project-overline">
                      Featured Project - {proj_type_dict[project_type]}
                    </p>

                    <h3 className="project-title">
                      <a href={external}>{title}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {/* {cta && (
                        <a href={cta} aria-label="Course Link" className="cta">
                          Learn More
                        </a>
                      )} */}
                      {slideshow && (
                        <a href={slideshow} aria-label="Slideshow Link">
                          <Icon name="Slideshow" />
                        </a>
                      )}
                      {slideshow1 && (
                        <a href={slideshow1} aria-label="Slideshow Link">
                          <Icon name="Slideshow" />
                        </a>
                      )}
                      {document && (
                        <a href={document} aria-label="Document Link">
                          <Icon name="Document" />
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
