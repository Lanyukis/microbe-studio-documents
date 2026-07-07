import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/setup-mumu',
        'getting-started/install-mumu',
        'getting-started/configure-mumu',
        'getting-started/connect-mumu',
        'getting-started/troubleshoot-mumu-cli',
      ],
    },
    {
      type: 'category',
      label: 'Using the App',
      items: [
        'using-the-app/instance-dashboard',
        'using-the-app/flow-queue',
        'using-the-app/flows-management',
        'using-the-app/scheduler',
        'using-the-app/discord-bot',
      ],
    },
    {
      type: 'category',
      label: 'Building Flows',
      items: [
        'building-flows/overview',
        {
          type: 'category',
          label: 'Node Types',
          items: [
            'building-flows/node-types/actions',
            'building-flows/node-types/detection',
            'building-flows/node-types/logic-nodes',
            'building-flows/node-types/memory',
            'building-flows/node-types/control-nodes',
          ],
        },
        'building-flows/node-properties-panel',
        'building-flows/title-bar-toolbar',
        'building-flows/testing-and-validation',
        'building-flows/sub-flows',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/glossary',
        'reference/legal-policies',
        'reference/flow-intellectual-property',
        'reference/i18n-workflow',
        'reference/deployment-notes',
        'reference/faq',
      ],
    },
  ],
};

export default sidebars;
