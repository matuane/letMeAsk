import { useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import logoImg from "../../assets/images/logo.svg";
import checkImg from "../../assets/images/check.svg";
import deleteImg from "../../assets/images/delete.svg";
import answerImg from "../../assets/images/answer.svg";

import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";

import { useRoom } from "../../Hooks/useRoom";
import { database } from "../../services/firebase";

import "./style.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [openModalDeleteRoom, setOpenModalDeleteRoom] = useState(false);
  const [openModalDeleteQuestion, setOpenModalDeleteQuestion] = useState(false);

  const [questionId, setQuestionId] = useState("");

  const { title, questions } = useRoom(roomId!);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  const handleSendHome = () => {
    history.push('/');
  };

  const contentDeleteQuestion = (
    <div className="deleteModal">
      <div>
        <DeleteOutlineIcon className="deleteIcon" />
      </div>
      <div>
        <Typography className="titleModalDelete">Excluir Pergunta</Typography>
      </div>
      <div>
        <Typography className="questionModal">
          Tem certeza que você deseja excluir esta pergunta?
        </Typography>
      </div>
      <div className="buttons">
        <button
          className="cancelButton"
          onClick={() => handleSetModalDeleteQuestion()}
        >
          Cancelar
        </button>
        <button
          onClick={() => handleDeleteQuestion(questionId)}
          className="confirmButton"
        >
          Confirmar
        </button>
      </div>
    </div>
  );

  const contentDeleteRoom = (
    <div className="deleteModal">
      <div>
        <HighlightOffIcon className="deleteIcon" />
      </div>
      <div>
        <Typography className="titleModalDelete">Encerrar Sala</Typography>
      </div>
      <div>
        <Typography className="questionModal">
          Tem certeza que você deseja encerrar essa sala?
        </Typography>
      </div>
      <div className="buttons">
        <button
          className="cancelButton"
          onClick={() => handleSetModalDeleteRoom()}
        >
          Cancelar
        </button>
        <button onClick={() => handleEndRoom()} className="confirmButton">
          Confirmar
        </button>
      </div>
    </div>
  );

  const handleSetModalDeleteQuestion = () => {
    setOpenModalDeleteQuestion(!openModalDeleteQuestion);
  };

  const handleSetModalDeleteRoom = () => {
    setOpenModalDeleteRoom(!openModalDeleteRoom);
  };

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    handleSetModalDeleteQuestion();
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <>
      <Dialog
        open={openModalDeleteQuestion}
        onClose={handleSetModalDeleteQuestion}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{contentDeleteQuestion}</DialogContent>
      </Dialog>

      <Dialog
        open={openModalDeleteRoom}
        onClose={handleSetModalDeleteRoom}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{contentDeleteRoom}</DialogContent>
      </Dialog>

      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="Letmeask" onClick={handleSendHome}/>
            <div>
              <RoomCode code={roomId!} />
              <Button isOutlined onClick={handleSetModalDeleteRoom}>
                Encerrar sala
              </Button>
            </div>
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </div>

          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  author={question.author}
                  content={question.content}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      handleSetModalDeleteQuestion();
                      setQuestionId(question.id);
                    }}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
