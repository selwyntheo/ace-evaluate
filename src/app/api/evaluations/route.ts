import { NextRequest, NextResponse } from 'next/server';
import { EvaluationEngine } from '@/lib/evaluation-engine';

export async function POST(request: NextRequest) {
  try {
    const { agentId, suiteId } = await request.json();

    if (!agentId || !suiteId) {
      return NextResponse.json(
        { error: 'agentId and suiteId are required' },
        { status: 400 }
      );
    }

    // Start evaluation
    const evaluation = await EvaluationEngine.runEvaluation(agentId, suiteId);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Error running evaluation:', error);
    return NextResponse.json(
      { error: 'Failed to run evaluation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const suites = EvaluationEngine.getAvailableSuites();
    return NextResponse.json(suites);
  } catch (error) {
    console.error('Error fetching evaluation suites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch evaluation suites' },
      { status: 500 }
    );
  }
}
