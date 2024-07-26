import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const JAN_1ST_2030 = 1893456000
const ONE_GWEI: bigint = 1_000_000_000n
const ONE_HUNDRED_GWEI: bigint = 100_000_000_000n

const LockModule = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", 1721803920)
  const lockedAmount = m.getParameter("lockedAmount", ONE_HUNDRED_GWEI)

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  })

  return { lock }
})

export default LockModule
