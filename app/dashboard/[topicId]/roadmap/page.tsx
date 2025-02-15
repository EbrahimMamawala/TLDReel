"use client";
import MermaidFlowchart from "@/app/components/RoadmapDiagram";
import { useTopicStore } from "@/store/topicStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

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
        }
      }
    }
  };

  export default function RoadmapDiagram() {
    const [isLoading, setIsLoading] = useState(true);
    const [roadmapData, setRoadmapData] = useState(null);
    const params = useParams();

    useEffect(() => {
        const allTopics = useTopicStore.getState().selectedTopics;
        const fetchRoadmap = async () => {
            setIsLoading(true);
            try {
              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
              const response = await fetch(`${baseUrl}/roadmaps`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic_id: params.topicId, user_input: allTopics }),
              });
              const data = await response.json();
              setRoadmapData(data);
            } catch (error) {
              console.error(error);
            } finally {
              setIsLoading(false);
            }
        };
        fetchRoadmap();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl font-semibold">Generating Your Roadmap...</div>
            </div>
        );
    }
    return (
      <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-gray-100">
        <MermaidFlowchart jsonData={roadmapData} />
      </main>
    )
  }
