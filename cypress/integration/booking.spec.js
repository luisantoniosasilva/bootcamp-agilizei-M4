/// <reference types="cypress" />

import req from '../support/api/requests'
import assertions from '../support/api/assertions'
import schemas from '../support/api/schemas'

context('Booking', () => {
    before(() => {
        req.doAuth()
    })

    it('Validar o contrato do GET Booking @contract', () => {
        req.getBooking()
            .then(getBookingResponse => {
                assertions.validateContractOf(
                    getBookingResponse,
                    schemas.getBookingSchema()
                )
            })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.bookingIdIsNotNull(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldDuration(postBookingResponse, 900)
        })
    });

    it('Tentar alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.putBookingWithoutToken(postBookingResponse)
                .then(putBookingResponde => {
                    assertions.shouldHaveStatus(putBookingResponde, 403)
                })
        })
    });

    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.putBooking(postBookingResponse)
                .then(putBookingResponde => {
                    assertions.shouldHaveStatus(putBookingResponde, 200)
                })
        })
    });

    it('Tentar alterar uma reserva inexistente @functional', () => {
        req.putNonexistentBooking()
            .then(putBookingResponde => {
                assertions.shouldHaveStatus(putBookingResponde, 405)
            })
    });

    it('Tentar alterar uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.putBookingInvalidToken(postBookingResponse)
                .then(putBookingResponde => {
                    assertions.shouldHaveStatus(putBookingResponde, 403)
                })
        })
    });

    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
            })
        })
    });

    it('Tentar excluir uma reserva inexistente @functional', () => {
        req.deleteNonexistentBooking().then(deleteBookingResponse => {
            assertions.shouldHaveStatus(deleteBookingResponse, 405)
        })
    });

    it('Tentar excluir uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingInvalidToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
    });

    it('Tentar excluir uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
    });
});