"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import mermaid from "mermaid"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

export default function MermaidFlowchart({ jsonData }: { jsonData: any }) {
  const [diagram, setDiagram] = useState("")
  const router = useRouter() // Use Next.js Router

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      flowchart: {
        nodeSpacing: 100,
        rankSpacing: 100,
      },
    })

    const sanitizeId = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "_")

    const parseJsonToFlowData = (data: any) => {
      const nodes: { id: string; label: string }[] = []
      const edges: { from: string | null; to: string }[] = []

      const traverse = (parent: string | null, obj: any) => {
        if (typeof obj === "object" && !Array.isArray(obj)) {
          Object.entries(obj).forEach(([key, value]) => {
            const nodeId = sanitizeId(key)
            nodes.push({ id: nodeId, label: key })
            if (parent) edges.push({ from: parent, to: nodeId })

            traverse(nodeId, value)
          })
        } else if (Array.isArray(obj)) {
          obj.forEach((item) => {
            const nodeId = sanitizeId(item)
            nodes.push({ id: nodeId, label: item })
            edges.push({ from: parent, to: nodeId })
          })
        }
      }

      Object.entries(data).forEach(([key, value]) => traverse(null, { [key]: value }))

      return { nodes, edges }
    }

    const flowData = parseJsonToFlowData(jsonData)

    const generateMermaidGraph = (data: {
      nodes: { id: string; label: string }[]
      edges: { from: string | null; to: string }[]
    }) => {
      let graph = "graph TD;\n"
      data.nodes.forEach((node: { id: string; label: string }) => {
        graph += `  ${node.id}["${node.label}"];\n`
      })
      data.edges.forEach((edge) => {
        graph += `  ${edge.from} --> ${edge.to};\n`
      })
      return graph
    }

    const mermaidGraph = generateMermaidGraph(flowData)

    mermaid.render("mermaidChart", mermaidGraph).then(({ svg }) => {
      setDiagram(svg)
    })
  }, [jsonData])

  return (
    <div className="relative w-full h-full overflow-hidden">

      <TransformWrapper initialScale={1.5} minScale={0.5} maxScale={4} initialPositionX={0} initialPositionY={0}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10">
              <div className="inline-flex flex-col gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                <button
                  onClick={() => zoomIn()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm min-w-[80px]"
                >
                  Zoom In
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm min-w-[80px]"
                >
                  Zoom Out
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm min-w-[80px]"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Diagram with Zoom/Pan */}
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              <div
                className="min-w-[1200px] min-h-[800px] w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: diagram }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  )
}
