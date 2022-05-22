import { Injectable } from '@nestjs/common';
import { ParticipantsService } from './participants/participant.service';
import { RecordingsService } from './recordings/recording.service';
import { SessionsService } from './sessions/session.service';
@Injectable()
export class AppService {
  constructor(
    private sessions: SessionsService,
    private participants: ParticipantsService,
    private recording: RecordingsService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getSession(sessionId: string): Promise<Record<string, unknown>> {
    const session = await this.sessions.findOne(sessionId);
    const participants = await this.participants.findAllBySession(sessionId);
    return {
      ...session.get(),
      phase: this.sessions.sessionPhase(session),
      participants,
    };
  }

  async createSession(): Promise<Record<string, unknown>> {
    const session = await this.sessions.create();
    return session.get();
  }

  async updateSession(
    sessId: string,
    updateObj: Record<string, unknown>,
  ): Promise<void> {
    await this.sessions.update(sessId, updateObj);
  }

  async stopSession(sessId: string): Promise<void> {
    await this.sessions.update(sessId, { isActive: false });
  }

  async addParticipant(token: string, name: string): Promise<any> {
    const session = await this.sessions.findOneByToken(token);
    if (!session) throw new Error('session not found');

    const { id } = await this.participants.create(session.id, name);
    return { id, session: session.id };
  }

  async startRecording(sessionId: string): Promise<void> {
    await this.sessions.startRecording(sessionId);
  }

  async stopRecording(sessionId: string): Promise<void> {
    await this.sessions.stopRecording(sessionId);
  }

  async recordingFinished(recordingDetails: any): Promise<void> {
    await this.recording.create(recordingDetails);
  }
}
