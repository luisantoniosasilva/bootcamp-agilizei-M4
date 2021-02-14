class Assertions {
    shouldHaveStatus(response, status) {
        expect(response.status, `status is ${status}`).to.eq(status)
    }

    validateContractOf(response, schema) {
        return cy.wrap(response.body)
            .should(
                schema
            )
    }

    bookingIdIsNotNull(response) {
        expect(response.body.bookingid, 'bookingid exists').to.not.be.null
    }

    shouldHaveDefaultHeaders(response) {
        expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive'
        })
    }

    shouldDuration(response, duration) {
        expect(response.duration, 'response duration').lt(duration)
    }

} export default new Assertions();