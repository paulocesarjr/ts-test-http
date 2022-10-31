/** @format */

import { LoginHandler } from "../../app/Handlers/LoginHandler"
import {
  HTTP_CODES,
  HTTP_METHODS,
  SessionToken
} from "../../app/Models/ServerModels"
import { Utils } from "../../app/Utils/Utils"

describe("LoginHandler test suite", () => {
  let loginHandler: LoginHandler

  const requestMock = {
    method: ""
  }

  const responseMock = {
    writeHead: jest.fn(), // cria uma função simulada
    write: jest.fn()
  }

  const authorizerMock = {
    generateToken: jest.fn()
  }

  const getRequestBody = jest.fn()

  // executa antes de cada caso de teste
  beforeEach(() => {
    loginHandler = new LoginHandler(
      requestMock as any,
      responseMock as any,
      authorizerMock as any
    )

    Utils.getRequestBody = getRequestBody
  })

  // executa após cada caso de teste
  afterEach(() => {
    jest.clearAllMocks() // limpa todos as simulações
  })

  const someSessionToken: SessionToken = {
    tokenId: "someTokenId",
    userName: "tainhaplay",
    valid: true,
    expirationTime: new Date(),
    accessRights: [1, 2, 3]
  }

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

  test.only("post request with valid login", async () => {
    requestMock.method = HTTP_METHODS.POST

    getRequestBody.mockReturnValueOnce({
      username: "tainhaplay",
      passwrod: "abc@123"
    })

    authorizerMock.generateToken.mockReturnValueOnce(someSessionToken) // retorna um valor mocado quando a função for chamada
    await loginHandler.handleRequest()

    // mockReturnValueOnce permite encadeamento de chamadas
  })
})
