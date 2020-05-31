import TermPills from "../term-pills"
import { cleanCourseId, cleanCourseTitle } from "../../utils/course-namer"
import React from "react"
import { Link } from "gatsby"

const CourseQuickViewContent = ({
  id,
  credits,
  description,
  requirements,
  title,
  terms_offered,
}) => (
  <>
    <h1 className="mb-2">{cleanCourseId(id)}</h1>
    <h2 className="mb-2">{cleanCourseTitle(title)}</h2>
    <TermPills termsMap={terms_offered} />
    <p className="mt-2">{requirements}</p>
    <p className="text-xs">
      {description.length > 850
        ? description.substring(0, 800) + "…"
        : description}
    </p>
    <Link
      className="font-semibold btn btn-blue hover:text-white border-blue-200 p-2 text-center mt-auto"
      to={`/courses/${id}`}
    >
      View more details
    </Link>
  </>
)

const CourseQuickView = ({
  id,
  credits,
  description,
  requirements,
  title,
  terms_offered,
  children,
}) => {
  return id ? (
    <CourseQuickViewContent
      {...{ id, credits, description, requirements, title, terms_offered }}
    />
  ) : (
    <div>{children}</div>
  )
}

export { CourseQuickViewContent, CourseQuickView }
