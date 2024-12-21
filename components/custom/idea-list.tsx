import { IdeaCard } from "./idea-card"

interface Idea {
  _id: string
  ideaName: string
  ideaDescription: string
  ideaURL?: string
}

interface IdeaListProps {
  ideas: Idea[]
}

export function IdeaList({ ideas }: IdeaListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Ideas</h2>
      {ideas.map((idea) => (
        <IdeaCard key={idea._id} {...idea} />
      ))}
    </div>
  )
}

