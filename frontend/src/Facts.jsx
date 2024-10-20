import React from 'react';

const Facts = ({ allergyKind, allergies }) => {
    const getMostPrevalentAllergen = (relevantAllergies) => {
        const allergenCount = {};

        relevantAllergies.forEach(allergy => {
            const allergen = allergy.allergen;
            allergenCount[allergen] = (allergenCount[allergen] || 0) + 1;
        });

        let mostPrevalent = null;
        let maxCount = 0;

        for (const allergen in allergenCount) {
            if (allergenCount[allergen] > maxCount) {
                maxCount = allergenCount[allergen];
                mostPrevalent = allergen;
            }
        }

        return mostPrevalent ? `${mostPrevalent} with ${maxCount} reactions.` : 'No reactions recorded.';
    };

    const getFacts = (kind) => {
        const relevantAllergies = allergies.filter(allergy => allergy.kind === kind);

        switch (kind) {
            case 'Food':
                const countThisMonth = relevantAllergies.filter(allergy => {
                    const date = new Date(allergy.date);
                    return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
                }).length;

                const countLastMonth = relevantAllergies.filter(allergy => {
                    const date = new Date(allergy.date);
                    return date.getMonth() === new Date().getMonth() - 1 && date.getFullYear() === new Date().getFullYear();
                }).length;

                const prevalentAllergen = getMostPrevalentAllergen(relevantAllergies);
                return [
                    `You have had ${countThisMonth} food reactions this month. You had ${countThisMonth - countLastMonth} more food reactions this month than last month.`,
                    `The most prevalent food allergen reaction is ${prevalentAllergen}`,
                    `You have ${relevantAllergies.length} total food reactions.`,
                ]; 

            case 'Seasonal':
                const countThisMonths = relevantAllergies.filter(allergy => {
                const date = new Date(allergy.date);
                return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
            }).length;

            const countLastMonths = relevantAllergies.filter(allergy => {
                const date = new Date(allergy.date);
                return date.getMonth() === new Date().getMonth() - 1 && date.getFullYear() === new Date().getFullYear();
            }).length;

            const prevalentAllergens = getMostPrevalentAllergen(relevantAllergies);
            return [
                `You have had ${countThisMonths} seasonal reactions this month. You had ${countThisMonths - countLastMonths} more seasonal reactions this month than last month.`,
                `The most prevalent seasonal allergen reaction is ${prevalentAllergens}`,
                `You have ${relevantAllergies.length} total seasonal reactions.`,
            ]; 
            case 'Skin':
                const countThisMonthsk = relevantAllergies.filter(allergy => {
                const date = new Date(allergy.date);
                return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
            }).length;

            const countLastMonthsk = relevantAllergies.filter(allergy => {
                const date = new Date(allergy.date);
                return date.getMonth() === new Date().getMonth() - 1 && date.getFullYear() === new Date().getFullYear();
            }).length;

            const prevalentAllergensk = getMostPrevalentAllergen(relevantAllergies);
            return [
                `You have had ${countThisMonthsk} skin reactions this month. You had ${countThisMonthsk - countLastMonthsk} more skin reactions this month than last month.`,
                `The most prevalent skin allergen reaction is ${prevalentAllergensk}`,
                `You have ${relevantAllergies.length} total skin reactions.`,
            ]; 
            case 'Medicine':
                const countThisMonthm = relevantAllergies.filter(allergy => {
                    const date = new Date(allergy.date);
                    return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
                }).length;
    
                const countLastMonthm = relevantAllergies.filter(allergy => {
                    const date = new Date(allergy.date);
                    return date.getMonth() === new Date().getMonth() - 1 && date.getFullYear() === new Date().getFullYear();
                }).length;
    
                const prevalentAllergenm = getMostPrevalentAllergen(relevantAllergies);
                return [
                    `You have had ${countThisMonthm} medicine reactions this month. You had ${countThisMonthm - countLastMonthm} more medicine reactions this month than last month.`,
                    `The most prevalent medicine allergen reaction is ${prevalentAllergenm}`,
                    `You have ${relevantAllergies.length} total medicine reactions.`,
                ]; 
            case 'Animals':
                const countThisMontha = relevantAllergies.filter(allergy => {
                    const date = new Date(allergy.date);
                    return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
                }).length;
    
                const countLastMontha = relevantAllergies.filter(allergy => {
                    const date = new Date(allergy.date);
                    return date.getMonth() === new Date().getMonth() - 1 && date.getFullYear() === new Date().getFullYear();
                }).length;
    
                const prevalentAllergena = getMostPrevalentAllergen(relevantAllergies);
                return [
                    `You have had ${countThisMontha} animal reactions this month. You had ${countThisMontha - countLastMontha} more animal reactions this month than last month.`,
                    `The most prevalent animal allergen reaction is ${prevalentAllergena}`,
                    `You have ${relevantAllergies.length} total animal reactions.`,
                ]; 
            case 'Other':
                const countThisMontho = relevantAllergies.filter(allergy => {
                const date = new Date(allergy.date);
                return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
            }).length;

            const countLastMontho = relevantAllergies.filter(allergy => {
                const date = new Date(allergy.date);
                return date.getMonth() === new Date().getMonth() - 1 && date.getFullYear() === new Date().getFullYear();
            }).length;

            const prevalentAllergeno = getMostPrevalentAllergen(relevantAllergies);
            return [
                `You have had ${countThisMontho} other reactions this month. You had ${countThisMontho - countLastMontho} more other reactions this month than last month.`,
                `The most prevalent other allergen reaction is ${prevalentAllergeno}`,
                `You have ${relevantAllergies.length} total other reactions.`,
            ]; 
        }
    };

    return (
        <div>
            <h3>Facts for {allergyKind} Allergies:</h3>
    <div className="facts-container">
        {getFacts(allergyKind).map((fact, index) => (
            <div key={index} className="fact-column">
                {fact}
            </div>
        ))}
    </div>
        </div>
    );
};

export default Facts;
