
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: 'classic' | 'modern' | 'creative';
  onTemplateChange: (template: 'classic' | 'modern' | 'creative') => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'Clean and traditional design',
      preview: 'bg-gradient-to-br from-gray-100 to-gray-200'
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Contemporary with blue accents',
      preview: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    {
      id: 'creative' as const,
      name: 'Creative',
      description: 'Bold design with purple highlights',
      preview: 'bg-gradient-to-br from-purple-100 to-purple-200'
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="relative">
              <button
                onClick={() => onTemplateChange(template.id)}
                className={`w-full text-left transition-all ${
                  selectedTemplate === template.id 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : 'hover:shadow-md'
                }`}
              >
                <div className={`h-24 rounded-lg ${template.preview} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-xs text-gray-600 font-medium">
                    {template.name}
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-900">{template.name}</p>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
