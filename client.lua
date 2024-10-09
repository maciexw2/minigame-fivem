ESX = exports["es_extended"]:getSharedObject()

local succes = false
local active = false
local MinigameFinished = false
local win = false
local winTrigger = nil
local FailTrigger = nil

function StartGame(cb) 
    if active then return end

        SetNuiFocus(true, true)
        SendNUIMessage({action = "startGame"})
        active = true
        MinigameFinished = false

        while active do
            Citizen.Wait(500)
        end

        if cb then
            cb(win)
        end

        return win
    end

exports('StartGame', StartGame)



RegisterNUICallback('udane', function(data, cb)
    SetNuiFocus(false, false)
    win = true
    MinigameFinished = false
    active = false
    cb('g')
end)

RegisterNUICallback('nieudane', function(data, cb)
    SetNuiFocus(false, false)
    active = false
    win = false
    cb('g')
end)

RegisterCommand('testminigame', function()
    local win = exports['minigame']:StartGame()
    if win == true then
        ESX.ShowNotification('Udano')
    else
        ESX.ShowNotification('Nie Udano')
    end
end)