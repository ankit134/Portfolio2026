import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

export function CaseStudyArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Shared hover CTA — `className` e.g. recent-works__cta or work-card__cta */
const CaseStudyCta = forwardRef(function CaseStudyCta(
  { projectSlug, enabled, className = '' },
  ref,
) {
  const classes =
    `case-study-cta ${className}${enabled ? '' : ` ${className}--disabled`}`.trim()

  if (enabled) {
    return (
      <Link
        ref={ref}
        to={`/projects/${projectSlug}`}
        className={classes}
        onClick={(e) => e.stopPropagation()}
      >
        View Case Study
        <CaseStudyArrow />
      </Link>
    )
  }

  return (
    <span ref={ref} className={classes} aria-disabled="true">
      View Case Study
      <CaseStudyArrow />
    </span>
  )
})

export default CaseStudyCta
