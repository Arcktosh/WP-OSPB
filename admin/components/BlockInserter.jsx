import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function BlockInserter({ onInsert }) {
  const blocks = [
    { type: 'text', label: 'Text Block' },
    // Add more block types here later
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">+ Add Block</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="flex flex-col space-y-2">
          {blocks.map((block) => (
            <Button
              key={block.type}
              variant="ghost"
              onClick={() => onInsert(block.type)}
              className="justify-start"
            >
              {block.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
