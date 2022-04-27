import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { BookCommentsService } from "src/comment/comment.service";
import { BookCommentDto } from "src/comment/dto/comment.dto";

@WebSocketGateway(81, { transports: ['websocket'] })
export class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private bookCommentsService: BookCommentsService) {}
    @WebSocketServer() 
    server: Server;
    bookId: number;

    afterInit(server: Server) {
        console.log('Init');
    }

    handleDisconnect(client: Socket) {
        console.log('Disconnect');
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.server.emit('msgToClient', this.getAllComments(this.bookId))
    }

    getAllComments(id: number) {
        return this.bookCommentsService.findAllBookComment(id)
    }

    @SubscribeMessage('msgToServer')
    addComment(@MessageBody() text: string, @ConnectedSocket() client: Socket): Promise<BookCommentDto> {
        return this.bookCommentsService.create({ bookId: this.bookId, comment: text })
    }

}