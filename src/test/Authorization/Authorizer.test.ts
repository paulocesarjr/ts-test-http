/** @format */

import { Authorizer } from "../../app/Authorization/Authorizer"
import { SessionTokenDBAccess } from "../../app/Authorization/SessionTokenDBAccess"
import { UserCredentialsDbAccess } from "../../app/Authorization/UserCredentialsDbAccess"
import { SessionToken } from "../../app/Models/ServerModels"

jest.mock("../../app/Authorization/SessionTokenDBAccess")
jest.mock("../../app/Authorization/UserCredentialsDbAccess")

describe("Authorizer test suite", () => {
  let authorizer: Authorizer

  const userCredentialsDBAcessMock = {
    getUserCredential: jest.fn()
  }

  const sessionTokenDBAccess = {
    storeSessionToken: jest.fn()
  }

  const someAccount = {
    username: "someUser",
    password: "password"
  }

  beforeEach(() => {
    authorizer = new Authorizer(
      sessionTokenDBAccess as any,
      userCredentialsDBAcessMock as any
    )
  })

  test("constructor arguments", () => {
    new Authorizer()
    expect(SessionTokenDBAccess).toBeCalled()
    expect(UserCredentialsDbAccess).toBeCalled()
  })

  test("should return sessionToken for valid credentials", async () => {
    // spyOn: substitiu o valor de funções globais
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0)
    jest.spyOn(global.Date, "now").mockReturnValueOnce(0)

    userCredentialsDBAcessMock.getUserCredential.mockResolvedValueOnce({
      username: "someUser",
      accessRights: [1, 2, 3]
    })

    const expectedSessionToken: SessionToken = {
      userName: "someUser",
      accessRights: [1, 2, 3],
      valid: true,
      tokenId: "",
      expirationTime: new Date(60 * 60 * 1000)
    }

    const sessionToken = await authorizer.generateToken(someAccount)
    expect(expectedSessionToken).toEqual(sessionToken)
    expect(sessionTokenDBAccess.storeSessionToken).toBeCalledWith(sessionToken)
  })
})
