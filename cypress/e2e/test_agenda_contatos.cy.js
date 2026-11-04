describe('Testando Agenda de Contatos', () => {
  beforeEach( () => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
  })

  // Duas versões devido a repetidos erros e inconsistencia do servidor.

  it('Verificar se está caregando', () => {
    cy.get('input').should('have.length', 3)
  })

  it('Incluindo um contato', () => {
    
    cy.get('input[placeholder="Nome"]').type('Vinicius 13')
    cy.get('input[placeholder="E-mail"]').type('vinicius13@gmail.com')
    cy.get('input[placeholder="Telefone"]').type('(94) 99413-1314')
    cy.wait(3000)
    //Por que o server demora mais do que deveria para carregar o novo contato.
    cy.get('.adicionar').click()
    cy.contains('li', 'vinicius13@gmail.com').should('be.visible')
    cy.screenshot('add-vinicius')
  })

  it('Alterando o contato', () => {
    cy.contains('li', 'vinicius13@gmail.com').closest('.contato').find('.edit').click()
    cy.get('input[placeholder="Telefone"]').type('{end}{backspace}3')
    cy.get('.alterar').click()
    cy.contains('li', 'vinicius13@gmail.com').closest('.contato').should('contain.text', '(94) 99413-1313')
    cy.screenshot('modificando-tel')
  })

  it('Removendo um contato', () => {
    cy.contains('li', 'vinicius13@gmail.com').closest('.contato').find('.delete').click()
    //Odeio os clones do serve
    cy.get('body').then($b => { const $d = $b.find(`.contato:has(li:contains('vinicius13@gmail.com')) .delete`); if ($d.length) cy.wrap($d).click() })
    expect(cy.contains('li', 'vinicius13@gmail.com').should('not.exist'))
  })

  //Conjunto completo para evitar erros de copias usando um unico teste com tudo junto.

  it('Incluindo todo processo em um', () => {
    const email = `vinicius${Date.now()}@gmail.com`

    // Incluindo um contato
    cy.get('input[placeholder="Nome"]').type('Vinicius 13')
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Telefone"]').type('(94) 99413-1314')
    cy.get('.adicionar').click()
    cy.wait(3000)
    cy.contains('li', email).should('be.visible')

    // Alterando o contato
    cy.contains('li', email).closest('.contato').find('.edit').click()
    cy.get('input[placeholder="Telefone"]').type('{end}{backspace}3')
    cy.get('.alterar').click()
    cy.contains('li', email).closest('.contato').should('contain.text', '(94) 99413-1313')

    //Removendo o contato adicionado
    cy.wait(1000)
    cy.contains('li', email).closest('.contato').find('.delete').click()
    expect(cy.contains('li', email).should('not.exist'))
  })
})
