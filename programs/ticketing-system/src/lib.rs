use anchor_lang::prelude::*;

declare_id!("EYaJM3ZCcS7cRQZZcd9NaivR4SKj79Q4wVMUVnkBZWRW");

#[program]
pub mod ticketing_system {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>, ticket: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        base_account.tickets.push(ticket.clone());
        Ok(())
    }

    pub fn update(ctx: Context<Update>, ticket: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.tickets.push(ticket.clone());
        Ok(())
    }
}

#[account]
#[derive(Debug)]
pub struct BaseAccount {
    pub tickets: Vec<String>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}
