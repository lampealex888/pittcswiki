import DagreGraph from "dagre-d3-react"
import React, { useState } from "react"
import { navigate } from "gatsby"
import { toProperCourseId } from "../../utils/course-namer"
import { CourseQuickView } from "./course-quick-view"
import COURSE_LIST from "../../data/autogenerated_course_info.json"

const getCourseData = (courseId) => {
  if (!courseId) return {}
  return COURSE_LIST.courses.filter(({ id }) => id === courseId)[0]
}

/*
Usage <CourseGraph reqs={ 
	[
		["CMP401", "CS445"],
		["CS445", "CS447"],
		["CS447", "CS449", { type: 'coreq' }],
		["CS449", "CS1501"]
	]
 }
*/

const addNode = (id, nodeHash, nodes) => {
  if (!nodeHash[id]) {
    nodeHash[id] = true
    nodes.push({
      label: id,
      id: id,
      class: "course cursor-pointer",
      config: {
        width: 50,
      },
    })
  }
}

export default ({ reqs, showPreview = false }) => {
  const nodes = []
  const nodeHash = {}
  const links = []
  reqs.forEach((req) => {
    const link = {
      source: req[0],
      target: req[1],
      class: req[2] ? req[2].type : "prereq",
    }
    addNode(link.source, nodeHash, nodes)
    addNode(link.target, nodeHash, nodes)
    links.push(link)
  })

  const [currentCourse, setCurrentCourse] = useState(null)

  return (
    <div>
      <DagreGraph
        nodes={nodes}
        links={links}
        options={{
          rankdir: "LR",
          align: "UL",
          ranker: "tight-tree",
          fitBoundaries: true,
        }}
        height="400"
        width="480"
        shape="rect"
        className="course-graph mx-auto"
        onNodeClick={({ original: { id } }) =>
          setCurrentCourse(toProperCourseId(id))
        }
      />
      <div
        style={{ top: "10rem" }}
        className="border p-6 flex flex-col rounded br-8 lg:fixed lg:rounded-r-none lg:right-0 lg:w-1/4 shadow-md lg:border-r-0"
      >
        <CourseQuickView {...getCourseData(currentCourse)}>
          <h3>Click a course on the graph to see details</h3>
          <p>
            The diagram above shows the relationships between the core classes!
          </p>
        </CourseQuickView>
      </div>
    </div>
  )
}
