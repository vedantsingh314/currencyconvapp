import numpy as np
from collections import Counter

class Node:
    def __init__(self, feature=None, value=None, results=None, true_branch=None, false_branch=None):
        self.feature = feature
        self.value = value
        self.results = results
        self.true_branch = true_branch
        self.false_branch = false_branch

def entropy(data):
    counts = np.bincount(data)
    probabilities = counts / len(data)
    return -np.sum([p * np.log2(p) for p in probabilities if p > 0])

def split_data(X, y, feature, value):
    true_indices = np.where(X[:, feature] <= value)[0]
    false_indices = np.where(X[:, feature] > value)[0]
    true_X, true_y = X[true_indices], y[true_indices]
    false_X, false_y = X[false_indices], y[false_indices]
    return true_X, true_y, false_X, false_y

def build_tree(X, y):
    if len(set(y)) == 1:
        return Node(results=y[0])
    
    best_gain = 0
    best_criteria = None
    best_sets = None
    n_features = X.shape[1]
    
    current_entropy = entropy(y)
    
    for feature in range(n_features):
        feature_values = set(X[:, feature])
        for value in feature_values:
            true_X, true_y, false_X, false_y = split_data(X, y, feature, value)
            true_entropy = entropy(true_y)
            false_entropy = entropy(false_y)
            p = len(true_y) / len(y)
            gain = current_entropy - p * true_entropy - (1 - p) * false_entropy
            
            if gain > best_gain:
                best_gain = gain
                best_criteria = (feature, value)
                best_sets = (true_X, true_y, false_X, false_y)
    
    if best_gain > 0:
        true_branch = build_tree(best_sets[0], best_sets[1])
        false_branch = build_tree(best_sets[2], best_sets[3])
        return Node(feature=best_criteria[0], value=best_criteria[1], true_branch=true_branch, false_branch=false_branch)
    
    return Node(results=Counter(y).most_common(1)[0][0])

# **Larger Student Performance Dataset**
feature_names = ["Hours Studied", "Attendance (%)", "Previous Score", "Extra Practice"]
X = np.array([
    [2, 50, 60, 0], [4, 60, 70, 1], [6, 80, 75, 0], [8, 90, 80, 1], [1, 40, 50, 0],
    [9, 95, 90, 1], [7, 85, 85, 0], [3, 55, 65, 1], [5, 70, 78, 0], [10, 98, 95, 1],
    [3, 45, 60, 0], [6, 75, 80, 1], [8, 85, 88, 0], [2, 50, 55, 0], [7, 80, 83, 1]
])
y = np.array([0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1])  # 0 = Fail, 1 = Pass

tree = build_tree(X, y)

# **Function to print the decision tree in terminal**
def print_tree(node, depth=0):
    if node.results is not None:
        print("\t" * depth + f"Predict: {node.results}")
    else:
        print("\t" * depth + f"{feature_names[node.feature]} <= {node.value}?")
        print_tree(node.true_branch, depth + 1)
        print_tree(node.false_branch, depth + 1)

print_tree(tree)
