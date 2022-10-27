/** @format */

import { LoginHandler } from "../../app/Handlers/LoginHandler"
import { HTTP_CODES, HTTP_METHODS } from "../../app/Models/ServerModels"

describe("LoginHandler test suite", () => {
  let loginHandler: LoginHandler

  const requestMock = {
    method: ""
  }

  const responseMock = {
    writeHead: jest.fn() // cria uma função simulada
  }
  const authorizerMock = {}

  // executa antes de cada caso de teste
  beforeEach(() => {
    loginHandler = new LoginHandler(
      requestMock as any,
      responseMock as any,
      authorizerMock as any
    )
  })

  // executa após cada caso de teste
  afterEach(() => {
    jest.clearAllMocks() // limpa todos as simulações
  })

  test("options request", async () => {
    requestMock.method = HTTP_METHODS.OPTIONS
    await loginHandler.handleRequest()
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.OK) // verifica se o método é chamado com um argumento específico
  })

  test("not handled http method", async () => {
    requestMock.method = "algumMetodoAleatorio"
    await loginHandler.handleRequest()
    expect(responseMock.writeHead).not.toHaveBeenCalled()
  })
})
