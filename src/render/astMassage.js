const _ = require('./utl');

function stateHasName(pName) {
    return function(pState) {
        return pState.name === pName;
    };
}

function findStateByName (pName) {
    return function(pStates) {
        return pStates.find(stateHasName(pName));
    };
}

function flattenStates(pStates) {
    let lRetval = [];
    pStates
        .filter(_.isType("composite"))
        .filter(_.has("statemachine"))
        .forEach((pState) => {
            if (pState.statemachine.hasOwnProperty("states")) {
                lRetval =
                    lRetval.concat(
                        flattenStates(pState.statemachine.states)
                    );
            }
        });

    return lRetval.concat(
        pStates.map(
            (pState) => ({
                name: pState.name,
                type: pState.type
            })
        )
    );
}

function flattenTransitions(pStateMachine) {
    let lTransitions = [];

    if (pStateMachine.hasOwnProperty("transitions")) {
        lTransitions = pStateMachine.transitions;
    }
    if (pStateMachine.hasOwnProperty("states")) {
        pStateMachine.states
            .filter(_.isType("composite"))
            .filter(_.has("statemachine"))
            .forEach((pState) => {
                lTransitions = lTransitions.concat(
                    flattenTransitions(pState.statemachine)
                );
            });
    }
    return lTransitions;
}

module.exports = {
    flattenStates,
    findStateByName,
    flattenTransitions(pStateMachine){
        pStateMachine.transitions = flattenTransitions(pStateMachine);
        return pStateMachine;
    }
};
/*
 This file is part of state-machine-cat.

 smcat is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 smcat is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with smcat.  If not, see <http://www.gnu.org/licenses/>.
 */
