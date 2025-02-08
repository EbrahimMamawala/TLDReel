import MermaidFlowchart from "@/app/components/RoadmapDiagram";

const jsonData = {
    "webDevelopmentRoadmap": {
      "Frontend": {
        "HTML": {
          "Basics": [
            "HTML Syntax",
            "Elements & Tags",
            "Attributes"
          ],
          "Advanced": [
            "Semantic HTML",
            "SEO Best Practices",
            "Accessibility (ARIA)"
          ]
        },
        "CSS": {
          "Basics": [
            "Selectors & Properties",
            "Box Model",
            "Positioning & Layout",
          ],
          "Responsive Design": [
            "Media Queries",
            "Mobile-first Design",
          ]
        },
        "JavaScript": {
          "Basics": [
            "Variables & Data Types",
            "Operators & Expressions",
            "Functions & Scope",
          ],
          "Frameworks & Libraries": [
            "React.js",
            "Vue.js",
            "Angular",
          ]
        }
      }
    }
  };

  export default function Home() {
    return (
      <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-gray-100">
        <MermaidFlowchart jsonData={jsonData} />
      </main>
    )
  }
