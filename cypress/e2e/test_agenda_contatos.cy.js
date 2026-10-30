describe('Testando Agenda de Contatos', () => {
  beforeEach( () => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
  })

  // fiz duas versões devido a repetidos erros e inconsistencia do servidor.
  // por algum motivo ele pode clona o contato do primeiro

  it('Verificar se está caregando', () => {
    cy.get('input').should('have.length', 3)
  })

  it('Incluindo um contato', () => {
    cy.get('input[placeholder="Nome"]').type('Vinicius 13')
    cy.get('input[placeholder="E-mail"]').type('vinicius13@gmail.com')
    cy.get('input[placeholder="Telefone"]').type('(94) 99413-1314')
    cy.get('.adicionar').click()
    cy.wait(3000)
    cy.get('.sc-eDDNvR.cTVgex').last().find('li').eq(0).should('have.text', 'Vinicius 13')
    cy.screenshot('add-vinicius')
  })

  it('Alterando o contato', () => {
    cy.get('.edit').last().click()
    cy.get('input[placeholder="Telefone"]').type('{end}{backspace}3')
    cy.get('.alterar').click()
    expect(cy.get('.sc-eDDNvR.cTVgex').last().find('li').eq(1).should('have.text', '(94) 99413-1313'))
    cy.screenshot('modificando-tel')
  })

  it('Removendo um contato', () => {
    cy.get('.sc-eDDNvR.cTVgex').last().find('li').eq(0).should('have.text', 'Vinicius 13').get('.delete').last().click()
    expect(cy.get('.sc-beqWaB.eQdhbg.contato').should('have.length', 3))
  })

  // esse não é cara ou coroa para dar erro mas, ele é grande demais.
  // pensei em não depender do contato ja criado mas, como o site não repõe, não parecia certo.

  it('Incluindo todo processo em um', () => {
    cy.get('input[placeholder="Nome"]').type('Vinicius 13')
    cy.get('input[placeholder="E-mail"]').type('vinicius13@gmail.com')
    cy.get('input[placeholder="Telefone"]').type('(94) 99413-1314')
    cy.get('.adicionar').click()
    cy.wait(3000)
    cy.get('.sc-eDDNvR.cTVgex').last().find('li').eq(0).should('have.text', 'Vinicius 13')
    cy.screenshot('add-vinicius')
    cy.wait(1000)
    cy.get('.edit').last().click()
    cy.get('input[placeholder="Telefone"]').type('{end}{backspace}3')
    cy.get('.alterar').click()
    expect(cy.get('.sc-eDDNvR.cTVgex').last().find('li').eq(1).should('have.text', '(94) 99413-1313'))
    cy.screenshot('modificando-tel')
    cy.wait(1000)
    cy.get('.sc-eDDNvR.cTVgex').last().find('li').eq(0).should('have.text', 'Vinicius 13').get('.delete').last().click()
    expect(cy.get('.sc-beqWaB.eQdhbg.contato').should('have.length', 3))
  })
})