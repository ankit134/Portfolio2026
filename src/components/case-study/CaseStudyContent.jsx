function renderTagline(tagline) {
  if (!tagline?.trim()) return null

  const match = tagline.match(/^(.*?)(with\s+)(.+?)(\.?\s*)$/i)
  if (match) {
    return (
      <>
        {match[1]}
        {match[2]}
        <em>{match[3]}</em>
        {match[4]?.includes('.') ? '.' : ''}
      </>
    )
  }

  return tagline
}

function CaseStudySectionItem({ item }) {
  if (item.type === 'paragraph') {
    return <p className="case-study__paragraph">{item.text}</p>
  }

  if (item.type === 'subheading') {
    return <h3 className="case-study__subheading">{item.text}</h3>
  }

  if (item.type === 'list') {
    return (
      <ul className="case-study__list">
        {item.items.map((entry) => (
          <li key={entry} className="case-study__list-item">
            {entry}
          </li>
        ))}
      </ul>
    )
  }

  if (item.type === 'callout') {
    return <p className="case-study__callout">{item.text}</p>
  }

  return null
}

function CaseStudySection({ block }) {
  return (
    <section className="case-study__section">
      {block.heading ? <h2 className="case-study__section-heading">{block.heading}</h2> : null}
      <div className="case-study__section-body">
        {block.items?.map((item, index) => (
          <CaseStudySectionItem key={`${item.type}-${index}`} item={item} />
        ))}
      </div>
    </section>
  )
}

function CaseStudyMedia({ block }) {
  if (!block.images?.length) return null

  return (
    <div className="case-study__media">
      <div className={`case-study__media-grid${block.images.length > 1 ? ' case-study__media-grid--multi' : ''}`}>
        {block.images.map((image, index) => (
          <figure key={`${image.src}-${index}`} className="case-study__figure">
            <img
              src={image.src}
              alt={image.alt || ''}
              className="case-study__image"
              loading="lazy"
              decoding="async"
            />
            {image.caption ? <figcaption className="case-study__caption">{image.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </div>
  )
}

function CaseStudyCredits({ credits }) {
  if (!credits?.columns?.length) return null

  return (
    <section className="case-study__credits">
      {credits.heading ? <h2 className="case-study__credits-heading">{credits.heading}</h2> : null}
      <div className="case-study__credits-grid">
        {credits.columns.map((column) => (
          <div key={column.label} className="case-study__credits-column">
            <p className="case-study__credits-label">{column.label}</p>
            {column.items?.length ? (
              <ul className="case-study__credits-list">
                {column.items.map((item) => (
                  <li key={item} className="case-study__credits-item">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {column.groups?.map((group) => (
              <div key={group.label} className="case-study__credits-group">
                <p className="case-study__credits-group-label">{group.label}</p>
                <ul className="case-study__credits-members">
                  {group.members.map((member) => (
                    <li key={member} className="case-study__credits-item">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function CaseStudyContent({ caseStudy, project, showHero = true }) {
  const { tagline, meta, blocks, credits } = caseStudy

  return (
    <article className="case-study">
      <p className="case-study__eyebrow">{project.category}</p>
      <h1 className="case-study__title">{project.title}</h1>

      {tagline ? <p className="case-study__tagline">{renderTagline(tagline)}</p> : null}

      {meta?.length > 0 ? (
        <dl className="case-study__meta">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="case-study__meta-label">{item.label}</dt>
              <dd className="case-study__meta-value">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {project.tags?.length > 0 ? (
        <ul className="case-study__tags">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="case-study__tag">{tag}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {showHero && project.image ? (
        <div className="case-study__hero">
          <img
            src={project.image}
            alt={project.imageAlt || project.title}
            className="case-study__image"
            loading="eager"
            decoding="async"
          />
        </div>
      ) : null}

      {blocks?.length > 0 ? (
        <div className="case-study__blocks">
          {blocks.map((block, index) => {
            if (block.type === 'section') {
              return <CaseStudySection key={`section-${block.heading}-${index}`} block={block} />
            }
            if (block.type === 'media') {
              return <CaseStudyMedia key={`media-${index}`} block={block} />
            }
            return null
          })}
        </div>
      ) : null}

      <CaseStudyCredits credits={credits} />
    </article>
  )
}
