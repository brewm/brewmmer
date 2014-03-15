exports.initRecipe = initRecipe;
exports.getStep = getStep;

var stepTypes = {
	HEAT: { minTemperature: 40, maxTemperature: 100 }, 
	BOIL: { minTemperature: 100, maxTemperature: 100 }, 
	COOL: { minTemperature: 10, maxTemperature: 40 }
}

var steps = []

var initRecipe = function(recipe){
	// it is an array
 	if(!Array.isArray(recipe)){
 		throw "FAILURE: recipe is not an array"
 	}

	recipe.forEach(function(i){
		// has valid start times
		if(!(0 <= i.startTime)){
			throw "FAILURE: startTime " + i.startTime + " < 0";
		}

		// has valid step types
		if(!(i.stepType in stepTypes)){
			throw "FAILURE: invalid stepType " + i.stepType;
		}

		// has valid temperature
		if(!(stepTypes[i.stepType].minTemperature <= i.temperature) || !(i.temperature <= stepTypes[i.stepType].maxTemperature)){
			throw "FAILURE: invalid temperature " + i.temperature + " for step type " + i.stepType;
		}

		steps.push(i);
	});

	return "OK";
}

var getStep = function(elapsedTime){
	var possibleSteps = steps.filter(function(element){
		return (element.startTime < elapsedTime);
	});
	return possibleSteps.sort(function(a,b){
		return b.startTime-a.startTime;
	})[0];
}
