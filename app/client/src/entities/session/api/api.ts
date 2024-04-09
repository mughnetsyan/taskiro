import { createJsonMutation, createJsonQuery, declareParams } from "@farfetched/core"

import { getRequestPath } from "shared/api"

import { sessionContract, undefinedContract } from "./contracts"
import { SignInDto, SignUpDto } from "./dto"


export const sessionQuery = createJsonQuery({
    initialData: null,
    request: {
        method: 'GET',
        url: getRequestPath('session'),
        credentials: 'include'
    },
    response: {
        contract: sessionContract
    }
})

export const refreshSessionQuery = createJsonQuery({
    initialData: null,
    request: {
        method: 'GET',
        url: getRequestPath('session/refresh'),
        credentials: 'include'
    },
    response: {
        contract: undefinedContract
    }
})

export const signUpMutation = createJsonMutation({
    params: declareParams<SignUpDto>(),
    request: {
        method: 'POST',
        url: getRequestPath('session/sign-up'), 
        body: (dto) => dto,
        credentials: 'include'
    },
    response: {
        contract: undefinedContract
    }
})


export const signInMutation = createJsonMutation({
    params: declareParams<SignInDto>(),
    request: {
        method: 'POST',
        url: getRequestPath('session/sign-in'), 
        body: (dto) => dto,
        credentials: 'include'
    },
    response: {
        contract: undefinedContract
    }
})
