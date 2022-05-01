import { Injectable } from '@nestjs/common';
import { ParticipantsService } from './participants/participant.service';
import { SessionsService } from './sessions/session.service';
@Injectable()
export class AppService {
  constructor(
    private sessions: SessionsService,
    private participants: ParticipantsService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getSession(sessionId: string): Promise<string> {
    const session = await this.sessions.findOne(sessionId);
    return session.toJSON();
  }

  async createSession(): Promise<string> {
    const session = await this.sessions.create();
    return session.id;
  }

  async addParticipant(
    sessionId: string,
    token: string,
    name: string,
  ): Promise<string> {
    const session = await this.sessions.findOne(sessionId);
    if (!session || session.sessionToken !== token)
      throw new Error('no token no play');

    const { id } = await this.participants.create(sessionId, name);
    return id;
  }

  async startRecording(sessionId: string): Promise<void> {
    await this.sessions.startRecording(sessionId);
  }
  async stopRecording(sessionId: string): Promise<void> {
    await this.sessions.stopRecording(sessionId);
  }
}
