import { MousePointer2, Table, TextCursorInput, Undo2, Redo2, LayoutTemplate } from 'lucide-react';
import { Tooltip } from '@/components/ui-app/Tooltip';

export const Sidebar = ({ activeTool, setActiveTool, setModalOpen }) => (
  <aside className="fixed top-1/2 -translate-y-1/2 left-4 z-20 flex flex-col items-center space-y-2">
    <div className="flex flex-col p-2 bg-white rounded-xl shadow-lg border border-gray-200 space-y-2">
      {sidebarConfig.tools.map((item) => (
        <Tooltip key={item.id} content={`${item.title} ${item.key ? item.key : ''}`} keys={item.key ? item.key.split(' ').filter(p => p !== '+') : []}>
          <button
            onClick={() => {
              if (item.id === 'templates') {
                item.action(setModalOpen);
              } else {
                item.action(setActiveTool);
              }
            }}
            className={`p-2 rounded-md ${activeTool === item.id ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200 transition-colors`}
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </div>
    <div className="flex flex-col p-2 bg-white rounded-xl shadow-lg border border-gray-200 space-y-2">
      {sidebarConfig.actions.map((item) => (
        <Tooltip key={item.id} content={`${item.title} ${item.key}`} keys={item.key.split(' ').filter(p => p !== '+')}>
          <button
            onClick={item.action}
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  </aside>
);

const sidebarConfig = {
  tools: [
    {
      id: 'select',
      title: 'Seleccionar',
      key: 'V',
      icon: <MousePointer2 className="h-6 w-6" />,
      action: (setActiveTool) => setActiveTool('select'),
    },
    {
      id: 'table',
      title: 'Crear mesa',
      key: 'M',
      icon: <Table className="h-6 w-6" />,
      action: (setActiveTool) => setActiveTool('table'),
    },
    {
      id: 'text',
      title: 'Texto',
      key: 'T',
      icon: <TextCursorInput className="h-6 w-6" />,
      action: (setActiveTool) => setActiveTool('text'),
    },
    {
      id: 'templates',
      title: 'Plantillas',
      icon: <LayoutTemplate className="h-6 w-6" />,
      action: (setModalOpen) => setModalOpen('templates'),
    },
  ],
  actions: [
    {
      id: 'undo',
      title: 'Deshacer',
      key: '⌘ + Z',
      icon: <Undo2 className="h-6 w-6" />,
      action: () => console.log('Deshacer'),
    },
    {
      id: 'redo',
      title: 'Rehacer',
      key: '⌘ + Shift + Z',
      icon: <Redo2 className="h-6 w-6" />,
      action: () => console.log('Rehacer'),
    },
  ],
};