use anchor_lang::prelude::*;

declare_id!("EYaJM3ZCcS7cRQZZcd9NaivR4SKj79Q4wVMUVnkBZWRW");

#[program]
pub mod ticketing_system {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>, tickets: Vec<u32>) -> ProgramResult {
        let ticketingSystem = &mut ctx.accounts.ticketing_system;
        let owner = ticketingSystem.to_account_info().key;

        for (idx, ticket) in tickets.iter().enumerate() {
            ticketingSystem.tickets[idx] = Ticket {
                owner: *owner,
                id: *ticket,
                available: true,
                idx: idx as u32,
            };
        }
        Ok(())
    }

    pub fn purchase(ctx: Context<PurchaseTicket>, ticket: u32, idx: u32) -> ProgramResult {
        let ticketingSystem = &mut ctx.accounts.ticketing_system;
        let user = &mut ctx.accounts.user;
        let mut ticket = ticketingSystem.tickets[idx as usize];
        ticket.available = false;
        ticket.owner = *user.to_account_info().key;
        ticketingSystem.tickets[idx as usize] = ticket;

        Ok(())
    }
}

#[account]
#[derive(Default)]
pub struct TicketingSystem {
    pub tickets: [Ticket; 3],
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone, Copy)]
pub struct Ticket {
    pub owner: Pubkey,
    pub id: u32,
    pub available: bool,
    pub idx: u32,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user)]
    pub ticketing_system: Account<'info, TicketingSystem>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PurchaseTicket<'info> {
    #[account(mut)]
    pub ticketing_system: Account<'info, TicketingSystem>,
    pub user: Signer<'info>,
}
