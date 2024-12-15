import React, { useState } from 'react'
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type FileSystemNode = {
  name: string
  type: 'file' | 'directory'
  children?: FileSystemNode[]
}

interface FileTreeProps {
  data: FileSystemNode
  onSelectFile: (path: string) => void
  currentFile: string
}

const FileTreeNode: React.FC<{ node: FileSystemNode; path: string; onSelectFile: (path: string) => void; currentFile: string; level: number }> = ({ node, path, onSelectFile, currentFile, level }) => {
  const [isOpen, setIsOpen] = useState(level < 2)

  const toggleOpen = () => {
    if (node.type === 'directory') {
      setIsOpen(!isOpen)
    }
  }

  const handleSelectFile = () => {
    if (node.type === 'file') {
      onSelectFile(path)
    }
  }

  const isCurrentFile = currentFile === path

  return (
    <div>
      <motion.div
        className={cn(
          "flex items-center space-x-2 py-1 px-2 rounded-md cursor-pointer",
          node.type === 'file' && "hover:bg-accent",
          isCurrentFile && "bg-accent"
        )}
        onClick={node.type === 'directory' ? toggleOpen : handleSelectFile}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        whileTap={{ scale: 0.98 }}
      >
        {node.type === 'directory' && (
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        )}
        {node.type === 'directory' ? <Folder size={16} className="text-blue-500" /> : <File size={16} className="text-gray-500" />}
        <span className={cn("text-sm", isCurrentFile && "font-medium")}>{node.name}</span>
      </motion.div>
      <AnimatePresence initial={false}>
        {node.type === 'directory' && isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="ml-4">
              {node.children?.map((child, index) => (
                <FileTreeNode
                  key={index}
                  node={child}
                  path={`${path}/${child.name}`}
                  onSelectFile={onSelectFile}
                  currentFile={currentFile}
                  level={level + 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const FileTree: React.FC<FileTreeProps> = ({ data, onSelectFile, currentFile }) => {
  return (
    <div className="p-2 bg-background border rounded-md overflow-auto max-h-[calc(100vh-120px)]">
      <FileTreeNode node={data} path={data.name} onSelectFile={onSelectFile} currentFile={currentFile} level={0} />
    </div>
  )
}

