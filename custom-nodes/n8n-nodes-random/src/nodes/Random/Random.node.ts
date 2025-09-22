import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    icon: 'file:random.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'True Random Number Generator via Random.org',
    defaults: { name: 'Random' },
    inputs: [{ type: 'main' }],
    outputs: [{ type: 'main' }],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'True Random Number Generator',
            value: 'trng',
            description: 'Generate a true random integer using Random.org',
          },
        ],
        default: 'trng',
      },
      {
        displayName: 'Min',
        name: 'min',
        type: 'number',
        typeOptions: { minValue: Number.MIN_SAFE_INTEGER },
        default: 1,
        description: 'Minimum integer (inclusive)',
        required: true,
      },
      {
        displayName: 'Max',
        name: 'max',
        type: 'number',
        typeOptions: { minValue: Number.MIN_SAFE_INTEGER },
        default: 60,
        description: 'Maximum integer (inclusive)',
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter('min', i) as number;
      const max = this.getNodeParameter('max', i) as number;

      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error('Min and Max must be integers.');
      }
      if (min > max) {
        throw new Error('Min cannot be greater than Max.');
      }

      const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

      const response = await this.helpers.httpRequest({
        method: 'GET',
        url,
        json: false, 
      });

      const value = parseInt(String(response).trim(), 10);
      if (!Number.isFinite(value)) {
        throw new Error('Invalid response from Random.org');
      }

      returnData.push({
        json: { value, min, max, source: 'random.org' },
      });
    }

    return [returnData];
  }
}
